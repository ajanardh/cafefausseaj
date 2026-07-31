import os

from dotenv import load_dotenv

load_dotenv()


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
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", default_database_url())
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    TOTAL_TABLES = 30
