
CREATE TABLE person (
    person_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    basic_premium DECIMAL(10, 2),
    password VARCHAR(255) NOT NULL,
    ahv_number VARCHAR(20) UNIQUE
);