
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario  SERIAL PRIMARY KEY,
    usuario     VARCHAR(100) NOT NULL,
    contrasena  VARCHAR(500) NOT NULL
);


