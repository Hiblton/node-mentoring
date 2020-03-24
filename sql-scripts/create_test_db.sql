DROP DATABASE IF EXISTS test_node_mentoring;

CREATE DATABASE test_node_mentoring;

\c test_node_mentoring;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  login TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  age INT,
  is_deleted boolean
);

CREATE TABLE groups (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  permissions TEXT ARRAY
);

CREATE TABLE user_group (
  user_id UUID NOT NULL,
  group_id UUID NOT NULL
);

INSERT INTO users (login, password, age, is_deleted)
VALUES ('Will Smith', '12345678', 50, false);
INSERT INTO users (login, password, age, is_deleted)
VALUES ('Bob Marley', 'qwerty', 80, false);
INSERT INTO users (login, password, age, is_deleted)
VALUES ('Barak Obama', '11111111', 45, false);

INSERT INTO groups (name, permissions)
VALUES ('guest', '{READ}');
INSERT INTO groups (name, permissions)
VALUES ('user', '{READ, WRITE, SHARE}');
INSERT INTO groups (name, permissions)
VALUES ('admin', '{READ, WRITE, DELETE, SHARE, UPLOAD_FILES}');
