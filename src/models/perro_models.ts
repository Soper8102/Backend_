import { query } from '../config/database';

export class Perro {
    id?: number;
    nombre: string;
    edad: number;
    raza: string;
    color: string;
    created_at?: Date;

    constructor(
        nombre: string,
        edad: number,
        raza: string,
        color: string,
        id?: number,
        created_at?: Date
    ) {
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this.raza = raza;
        this.color = color;
        this.created_at = created_at;
    }

    static async getAll(): Promise<Perro[]> {
        const result = await query('SELECT * FROM perros ORDER BY id ASC');
        return result.rows.map(
            (row: any) => new Perro(row.nombre, row.edad, row.raza, row.color, row.id, row.created_at)
        );
    }

    static async getById(id: number): Promise<Perro | null> {
        const result = await query('SELECT * FROM perros WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return null;
        }
        const row = result.rows[0];
        return new Perro(row.nombre, row.edad, row.raza, row.color, row.id, row.created_at);
    }

    static async create(data: { nombre: string; edad: number; raza: string; color: string }): Promise<Perro> {
        const result = await query(
            `INSERT INTO perros (nombre, edad, raza, color)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [data.nombre, data.edad, data.raza, data.color]
        );
        const row = result.rows[0];
        return new Perro(row.nombre, row.edad, row.raza, row.color, row.id, row.created_at);
    }
}

export const PerroModel = Perro;
