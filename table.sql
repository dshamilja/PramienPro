
CREATE TABLE person (
    person_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    grund_pramie DECIMAL(10, 2),
    password VARCHAR(255) NOT NULL,
    ahv_number VARCHAR(20) UNIQUE
);

-- Insert person
INSERT INTO person (person_id, username, first_name, last_name, grund_pramie, ahv_number)
VALUES 
('092394', 'Maxmuster', 'Max', 'Muster', 'CHF 500.00', '798.304.393'),
('545665', 'Lisameier', 'Lisa', 'Meier', 'CHF 700.00', '768.304.323'),
