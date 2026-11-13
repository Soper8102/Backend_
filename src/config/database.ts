import { Pool } from 'pg';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Pool de conexiones a PostgreSQL (soporta DATABASE_URL de Railway y variables locales)
const connectionString = process.env.DATABASE_URL || process.env.DATABASE_PUBLIC_URL;

const pool = connectionString
    ? new Pool({
        connectionString,
        ssl: connectionString.includes('localhost') || connectionString.includes('127.0.0.1')
            ? false
            : { rejectUnauthorized: false }
      })
    : new Pool({
        host: process.env.DB_HOST || process.env.PGHOST || '127.0.0.1',
        port: parseInt(process.env.DB_PORT || process.env.PGPORT || '5432', 10),
        user: process.env.DB_USER || process.env.PGUSER,
        password: process.env.DB_PASSWORD || process.env.PGPASSWORD,
        database: process.env.DB_NAME || process.env.PGDATABASE,
        max: parseInt(process.env.DB_MAX_CONNECTIONS || '10', 10),
        idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000', 10),
        connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT || '5000', 10)
    });

// Verificar conexión al iniciar
pool.on('connect', () => {
    console.log('Conectado exitosamente a PostgreSQL');
});

pool.on('error', (err) => {
    console.error('Error inesperado en el pool de PostgreSQL:', err);
});

// Función helper para ejecutar consultas
export const query = async (text: string, params?: any[]) => {
    const start = Date.now();
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log(`Query ejecutada en ${duration}ms - Filas: ${result.rowCount}`);
    return result;
};

// Exportar el pool para transacciones o uso directo
export default pool;
