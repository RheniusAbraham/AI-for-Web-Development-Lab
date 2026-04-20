CREATE DATABASE IF NOT EXISTS eventdb;
USE eventdb;

CREATE TABLE IF NOT EXISTS registrations (
    regno VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100),
    events TEXT
);
