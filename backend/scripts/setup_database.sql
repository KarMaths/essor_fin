-- Script de configuration PostgreSQL pour Essor Dental

-- Créer l'utilisateur
DROP USER IF EXISTS clinique_user;
CREATE USER clinique_user WITH PASSWORD 'LilJay8*8*';
ALTER USER clinique_user CREATEDB;

-- Créer la base de données
DROP DATABASE IF EXISTS essor_dental;
CREATE DATABASE essor_dental WITH OWNER = clinique_user ENCODING = 'UTF8';
GRANT ALL PRIVILEGES ON DATABASE essor_dental TO clinique_user;

-- Se connecter à la base
\c essor_dental

-- Créer la table admins
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

GRANT ALL PRIVILEGES ON TABLE admins TO clinique_user;
GRANT USAGE, SELECT ON SEQUENCE admins_id_seq TO clinique_user;

-- Insérer admin par défaut (password: admin123)
INSERT INTO admins (username, password, email) 
VALUES ('Fmervil', '$2b$10$HtT/Z0Z3hah6TmyYyC5ZseA13H.d.h2shDNMY13vs9bbyU39kfGlC', 'admin@essordental.com')
ON CONFLICT (username) DO NOTHING;

-- Afficher confirmation
SELECT 'Configuration terminée! Utilisateur: clinique_user, Base: essor_dental' AS status;
SELECT COUNT(*) as total_admins FROM admins;
