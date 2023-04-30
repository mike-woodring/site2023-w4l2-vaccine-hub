CREATE TABLE IF NOT EXISTS users (
    id         SERIAL PRIMARY KEY,
    password   TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name  TEXT NOT NULL,
    email      TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1) --,
    -- location   TEXT NOT NULL,
    -- date       TIMESTAMP NOT NULL
);