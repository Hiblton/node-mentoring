DROP DATABASE IF EXISTS module3;

CREATE DATABASE module3;

\c module3

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  login TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  age INT,
  is_deleted boolean
);

INSERT INTO users (login, password, age, is_deleted)
VALUES ('Will Smith', '12345678', 50, false);

INSERT INTO users (login, password, age, is_deleted)
VALUES ('Bob Marley', 'qwerty', 80, false);

INSERT INTO users (login, password, age, is_deleted)
VALUES ('Barak Obama', '11111111', 45, false);
