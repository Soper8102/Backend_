-- Tabla usuarios (login sencillo)
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario  SERIAL PRIMARY KEY,
    usuario     VARCHAR(100) NOT NULL,
    contrasena  VARCHAR(500) NOT NULL
);

-- 3 registros de prueba para probar el login
INSERT INTO usuarios (usuario, contrasena) VALUES
('admin', '123456'),
('jorge', 'mipassword'),
('invitado', 'guest123')
ON CONFLICT DO NOTHING;
