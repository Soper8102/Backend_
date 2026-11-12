import { query } from '../config/database';

export interface Componente {
    id?: number;
    nombre: string;
    descripcion?: string;
    precio: number;
    unidades: number;
    categoria_id: number;
    categoria_nombre?: string;  // Para el JOIN con categorías
    marca?: string;
    estado?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface Categoria {
    id?: number;
    nombre: string;
    descripcion?: string;
    created_at?: Date;
}

export class ComponenteModel {
    static async getAll(): Promise<Componente[]> {
        const result = await query(
            `SELECT c.id, c.nombre, c.descripcion, c.precio, c.unidades,
                    c.categoria_id, cat.nombre AS categoria_nombre,
                    c.marca, c.estado, c.created_at, c.updated_at
             FROM componentes c
             INNER JOIN categorias cat ON c.categoria_id = cat.id
             ORDER BY c.id ASC`
        );
        return result.rows;
    }

    static async getById(id: number): Promise<Componente | null> {
        const result = await query(
            `SELECT c.id, c.nombre, c.descripcion, c.precio, c.unidades,
                    c.categoria_id, cat.nombre AS categoria_nombre,
                    c.marca, c.estado, c.created_at, c.updated_at
             FROM componentes c
             INNER JOIN categorias cat ON c.categoria_id = cat.id
             WHERE c.id = $1`,
            [id]
        );
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    }

    static async create(data: Omit<Componente, 'id' | 'created_at' | 'updated_at' | 'categoria_nombre'>): Promise<Componente> {
        const { nombre, descripcion, precio, unidades, categoria_id, marca, estado } = data;
        const result = await query(
            `INSERT INTO componentes (nombre, descripcion, precio, unidades, categoria_id, marca, estado)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [nombre, descripcion, precio, unidades, categoria_id, marca, estado || 'disponible']
        );
        return result.rows[0];
    }

    static async update(
        id: number,
        data: Omit<Componente, 'id' | 'created_at' | 'updated_at' | 'categoria_nombre'>
    ): Promise<Componente | null> {
        const { nombre, descripcion, precio, unidades, categoria_id, marca, estado } = data;
        const result = await query(
            `UPDATE componentes
             SET nombre = $1, descripcion = $2, precio = $3, unidades = $4,
                 categoria_id = $5, marca = $6, estado = $7, updated_at = CURRENT_TIMESTAMP
             WHERE id = $8
             RETURNING *`,
            [nombre, descripcion, precio, unidades, categoria_id, marca, estado, id]
        );
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    }

    static async delete(id: number): Promise<Componente | null> {
        const result = await query(
            'DELETE FROM componentes WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    }
}

export class CategoriaModel {
    static async getAll(): Promise<Categoria[]> {
        const result = await query('SELECT * FROM categorias ORDER BY id ASC');
        return result.rows;
    }
}
