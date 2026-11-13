import fs from 'fs';
import path from 'path';
import pool from '../config/database';

async function initDb() {
    console.log('Iniciando carga de scripts SQL en la base de datos...');
    const sqlDir = path.join(__dirname, '../../sql');
    const files = [
        '01_create_database.sql',
        '02_create_perros.sql',
        '03_create_usuarios.sql',
        '04_create_clientes.sql'
    ];

    for (const file of files) {
        const filePath = path.join(sqlDir, file);
        if (fs.existsSync(filePath)) {
            console.log(`Ejecutando ${file}...`);
            const sql = fs.readFileSync(filePath, 'utf-8');
            try {
                await pool.query(sql);
                console.log(`✓ ${file} ejecutado correctamente.`);
            } catch (err: any) {
                console.error(`Error al ejecutar ${file}:`, err.message);
            }
        } else {
            console.warn(`Archivo no encontrado: ${filePath}`);
        }
    }

    console.log('Proceso de base de datos finalizado.');
    await pool.end();
}

initDb();
