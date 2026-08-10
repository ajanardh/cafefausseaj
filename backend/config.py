import os

from dotenv import load_dotenv

load_dotenv()


def normalize_database_url(url):
    if not url:
        return url
    # Render provides postgres:// or postgresql:// — force psycopg v3 driver
    if url.startswith("postgres://"):
        return url.replace("postgres://", "postgresql+psycopg://", 1)
    if url.startswith("postgresql://") and "+" not in url.split("://", 1)[0]:
        return url.replace("postgresql://", "postgresql+psycopg://", 1)
    return url


def default_database_url():
    user = os.getenv("PGUSER", os.getenv("USER", "postgres"))
    password = os.getenv("PGPASSWORD")
    host = os.getenv("PGHOST", "localhost")
    port = os.getenv("PGPORT", "5432")
    database = os.getenv("PGDATABASE", "cafe_fausse")

    if password:
        return f"postgresql+psycopg://{user}:{password}@{host}:{port}/{database}"

    return f"postgresql+psycopg://{user}@{host}:{port}/{database}"


class Config:
    SQLALCHEMY_DATABASE_URI = normalize_database_url(
        os.getenv("DATABASE_URL", default_database_url())
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "connect_args": {"connect_timeout": 10},
    }
    TOTAL_TABLES = 30
    FRONTEND_ORIGINS = os.getenv(
        "FRONTEND_ORIGINS",
        "http://localhost:5173,https://ajanardh.github.io",
    ).split(",")
