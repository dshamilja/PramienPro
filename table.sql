
CREATE TABLE Users (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    EmailAddress VARCHAR(255) NOT NULL,
    firtst_name VARCHAR(255),
    last_name VARCHAR(255),
    Birthdate DATE,
    grund_pramie DECIMAL(10, 2),
    ahv_number VARCHAR(16) NOT NULL
);

/* ganze table.sql kann gelöscht werden - war nur ein beispiel 
wie man durch js eine neue Tabelle auf supabase anlegen kann (also hinzufügen)*/
