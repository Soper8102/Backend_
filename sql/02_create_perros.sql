-- Tabla perros
CREATE TABLE IF NOT EXISTS perros (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INTEGER NOT NULL CHECK (edad >= 0),
    raza VARCHAR(100) NOT NULL,
    color VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar 5 registros de prueba
INSERT INTO perros (nombre, edad, raza, color) VALUES
('Max', 3, 'Golden Retriever', 'Dorado'),
('Luna', 2, 'Husky Siberiano', 'Blanco y Gris'),
('Rocky', 5, 'Pastor Aleman', 'Negro y Fuego'),
('Bella', 1, 'Poodle', 'Blanco'),
('Thor', 4, 'Bulldog Frances', 'Atigrado');
