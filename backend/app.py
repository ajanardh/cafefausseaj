import os
import random
import re
from datetime import datetime

from config import Config
from flask import Flask, jsonify, request
from flask_cors import CORS
from models import Customer, Reservation, db

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db.init_app(app)

EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


def validate_email(email):
    return bool(email and EMAIL_PATTERN.match(email.strip()))


def parse_time_slot(value):
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except (TypeError, ValueError):
        return None


def get_booked_tables(time_slot):
    reservations = Reservation.query.filter_by(time_slot=time_slot).all()
    return {reservation.table_number for reservation in reservations}


def assign_table(time_slot):
    booked = get_booked_tables(time_slot)
    available = [table for table in range(1, Config.TOTAL_TABLES + 1) if table not in booked]
    if not available:
        return None
    return random.choice(available)


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/api/reservations/availability", methods=["GET"])
def check_availability():
    time_slot_raw = request.args.get("time_slot")
    time_slot = parse_time_slot(time_slot_raw)

    if not time_slot:
        return jsonify({"error": "A valid time_slot is required."}), 400

    booked = get_booked_tables(time_slot)
    available_count = Config.TOTAL_TABLES - len(booked)

    return jsonify(
        {
            "time_slot": time_slot.isoformat(),
            "available": available_count > 0,
            "available_tables": available_count,
            "total_tables": Config.TOTAL_TABLES,
        }
    )


@app.route("/api/reservations", methods=["POST"])
def create_reservation():
    data = request.get_json(silent=True) or {}

    time_slot = parse_time_slot(data.get("time_slot"))
    guest_count = data.get("guest_count")
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    phone = (data.get("phone") or "").strip() or None

    if not time_slot:
        return jsonify({"error": "Please select a valid date and time."}), 400
    if not name:
        return jsonify({"error": "Customer name is required."}), 400
    if not validate_email(email):
        return jsonify({"error": "Please enter a valid email address."}), 400
    if not guest_count or int(guest_count) < 1:
        return jsonify({"error": "Number of guests must be at least 1."}), 400

    table_number = assign_table(time_slot)
    if table_number is None:
        return jsonify({"error": "This time slot is fully booked. Please choose another time."}), 409

    customer = Customer.query.filter_by(email=email).first()
    if not customer:
        customer = Customer(name=name, email=email, phone=phone, newsletter_signup=False)
        db.session.add(customer)
    else:
        customer.name = name
        if phone:
            customer.phone = phone

    reservation = Reservation(
        customer=customer,
        customer_name=name,
        time_slot=time_slot,
        table_number=table_number,
    )
    db.session.add(reservation)

    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"error": "Unable to complete reservation. Please try again."}), 500

    return jsonify(
        {
            "message": "Reservation confirmed!",
            "reservation": reservation.to_dict(),
            "guest_count": int(guest_count),
        }
    ), 201


@app.route("/api/newsletter", methods=["POST"])
def newsletter_signup():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip()
    name = (data.get("name") or "").strip() or "Newsletter Subscriber"

    if not validate_email(email):
        return jsonify({"error": "Please enter a valid email address."}), 400

    customer = Customer.query.filter_by(email=email).first()
    if customer:
        customer.newsletter_signup = True
        if name and name != "Newsletter Subscriber":
            customer.name = name
    else:
        customer = Customer(
            name=name,
            email=email,
            newsletter_signup=True,
        )
        db.session.add(customer)

    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"error": "Unable to subscribe. Please try again."}), 500

    return jsonify({"message": "Thank you for subscribing to our newsletter!"})


@app.cli.command("init-db")
def init_db():
    db.create_all()
    print("Database tables created.")


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    port = int(os.getenv("FLASK_PORT", "5001"))
    app.run(debug=True, port=port)
