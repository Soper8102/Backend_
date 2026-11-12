-- ============================================
-- Script 04: Tabla de Clientes
-- ============================================

CREATE TABLE IF NOT EXISTS clientes (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL,
    apellido    VARCHAR(100),
    email       VARCHAR(150),
    telefono    VARCHAR(50),
    direccion   TEXT,
    estado      VARCHAR(20) DEFAULT 'activo',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Registros iniciales de prueba
INSERT INTO clientes (nombre, apellido, email, telefono, direccion, estado) VALUES
('Carlos', 'Gómez', 'carlos.gomez@example.com', '3001234567', 'Calle 10 # 20-30', 'activo'),
('María', 'Rodríguez', 'maria.rodriguez@example.com', '3109876543', 'Carrera 15 # 45-12', 'activo'),
('Andrés', 'López', 'andres.lopez@example.com', '3205558899', 'Avenida 68 # 80-01', 'inactivo')
ON CONFLICT DO NOTHING;

