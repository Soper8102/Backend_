import { query } from '../config/database';

export interface Cliente {
    id?: number;
    nombre: string;
    apellido?: string;
    email?: string;
    telefono?: string;
    direccion?: string;
    estado?: string;
}

export class ClienteModel {
    static async getAll(): Promise<Cliente[]> {
        const result = await query('SELECT * FROM clientes ORDER BY id ASC');
        return result.rows;
    }

    static async getById(id: number): Promise<Cliente | null> {
        const result = await query('SELECT * FROM clientes WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    }

    static async create(data: Omit<Cliente, 'id'>): Promise<Cliente> {
        const { nombre, apellido, email, telefono, direccion, estado } = data;
        const result = await query(
            `INSERT INTO clientes (nombre, apellido, email, telefono, direccion, estado)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [nombre, apellido, email, telefono, direccion, estado || 'activo']
        );
        return result.rows[0];
    }


}
