-- ============================================
-- Script 01: Crear Base de Datos y Tablas
-- Proyecto: Venta de Componentes de PC
-- ============================================

-- 1. Crear la base de datos (ejecutar conectado a 'postgres')
-- CREATE DATABASE componentes_pc;

-- 2. Conectar a la base de datos componentes_pc antes de ejecutar lo siguiente
-- \c componentes_pc

-- ============================================
-- Tabla: categorias
-- ============================================
CREATE TABLE IF NOT EXISTS categorias (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Tabla: componentes
-- ============================================
CREATE TABLE IF NOT EXISTS componentes (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio      DECIMAL(10, 2) NOT NULL CHECK (precio >= 0),
    unidades    INTEGER NOT NULL DEFAULT 0 CHECK (unidades >= 0),
    categoria_id INTEGER NOT NULL REFERENCES categorias(id) ON DELETE RESTRICT,
    marca       VARCHAR(100),
    estado      VARCHAR(20) DEFAULT 'disponible' CHECK (estado IN ('disponible', 'agotado', 'descontinuado')),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas por categoría
CREATE INDEX IF NOT EXISTS idx_componentes_categoria ON componentes(categoria_id);

-- ============================================
-- Datos semilla: Categorías
-- ============================================
INSERT INTO categorias (nombre, descripcion) VALUES
    ('Procesadores', 'Unidades centrales de procesamiento (CPU)'),
    ('Tarjetas Gráficas', 'Unidades de procesamiento gráfico (GPU)'),
    ('Memoria RAM', 'Módulos de memoria de acceso aleatorio'),
    ('Almacenamiento', 'Discos duros y unidades de estado sólido'),
    ('Fuentes de Poder', 'Unidades de suministro de energía (PSU)')
ON CONFLICT (nombre) DO NOTHING;

-- ============================================
-- Datos semilla: Componentes (mínimo 10 registros)
-- ============================================
INSERT INTO componentes (nombre, descripcion, precio, unidades, categoria_id, marca, estado) VALUES
    -- Procesadores (categoria_id = 1)
    ('AMD Ryzen 7 7800X3D', 'Procesador 8 núcleos / 16 hilos, 4.2 GHz base, 5.0 GHz boost, 96MB L3 Cache, Socket AM5', 349.99, 15, 1, 'AMD', 'disponible'),
    ('Intel Core i7-14700K', 'Procesador 20 núcleos (8P + 12E) / 28 hilos, 3.4 GHz base, 5.6 GHz boost, Socket LGA 1700', 389.99, 10, 1, 'Intel', 'disponible'),
    ('AMD Ryzen 5 5600X', 'Procesador 6 núcleos / 12 hilos, 3.7 GHz base, 4.6 GHz boost, 32MB L3 Cache, Socket AM4', 149.99, 25, 1, 'AMD', 'disponible'),

    -- Tarjetas Gráficas (categoria_id = 2)
    ('NVIDIA GeForce RTX 4070 Super', 'GPU 12GB GDDR6X, 7168 CUDA Cores, Ray Tracing, DLSS 3.5', 599.99, 8, 2, 'NVIDIA', 'disponible'),
    ('AMD Radeon RX 7800 XT', 'GPU 16GB GDDR6, 3840 Stream Processors, Ray Tracing, FSR 3', 479.99, 12, 2, 'AMD', 'disponible'),
    ('NVIDIA GeForce RTX 4060 Ti', 'GPU 8GB GDDR6, 4352 CUDA Cores, Ray Tracing, DLSS 3', 399.99, 20, 2, 'NVIDIA', 'disponible'),

    -- Memoria RAM (categoria_id = 3)
    ('Corsair Vengeance DDR5 32GB (2x16GB)', 'Kit de memoria DDR5-6000 MHz, CL36, Intel XMP 3.0, RGB', 109.99, 30, 3, 'Corsair', 'disponible'),
    ('G.Skill Trident Z5 RGB DDR5 32GB (2x16GB)', 'Kit de memoria DDR5-6400 MHz, CL32, Intel XMP 3.0, RGB', 134.99, 18, 3, 'G.Skill', 'disponible'),
    ('Kingston Fury Beast DDR4 16GB (2x8GB)', 'Kit de memoria DDR4-3200 MHz, CL16, Intel XMP', 39.99, 50, 3, 'Kingston', 'disponible'),

    -- Almacenamiento (categoria_id = 4)
    ('Samsung 990 Pro 2TB NVMe', 'SSD NVMe PCIe 4.0, Lectura 7450 MB/s, Escritura 6900 MB/s, M.2 2280', 179.99, 22, 4, 'Samsung', 'disponible'),
    ('WD Black SN850X 1TB NVMe', 'SSD NVMe PCIe 4.0, Lectura 7300 MB/s, Escritura 6300 MB/s, M.2 2280', 89.99, 35, 4, 'Western Digital', 'disponible'),

    -- Fuentes de Poder (categoria_id = 5)
    ('Corsair RM850x 850W', 'Fuente modular 80 Plus Gold, ventilador 135mm, protecciones OVP/UVP/SCP', 139.99, 14, 5, 'Corsair', 'disponible'),
    ('EVGA SuperNOVA 750 G7', 'Fuente modular 750W, 80 Plus Gold, modo ECO silencioso', 109.99, 0, 5, 'EVGA', 'agotado'),
    ('Seasonic Focus GX-650', 'Fuente modular 650W, 80 Plus Gold, ventilador FDB 120mm', 99.99, 19, 5, 'Seasonic', 'disponible');
