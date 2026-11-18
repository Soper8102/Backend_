import { query } from '../config/database';

// Interfaz que define la forma de un usuario en la BD
export interface Usuario {
    id_usuario?: number;
    usuario: string;
    contrasena: string;
}

export class UsuarioModel {

    /**
     * Busca un usuario por su nombre de usuario Y su contraseña.
     * Si los dos coinciden, retorna el usuario.
     * Si no coinciden o no existe, retorna null.
     */
    static async login(usuario: string, contrasena: string): Promise<Usuario | null> {
        const result = await query(
            'SELECT * FROM usuarios WHERE usuario = $1 AND contrasena = $2',
            [usuario, contrasena]
        );

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    }

    /**
     * Busca si un usuario ya existe por su nombre/correo.
     */
    static async findByUsuario(usuario: string): Promise<Usuario | null> {
        const result = await query(
            'SELECT * FROM usuarios WHERE usuario = $1',
            [usuario]
        );

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows[0];
    }

    /**
     * Inserta un nuevo usuario en la base de datos.
     */
    static async create(usuario: string, contrasena: string): Promise<Usuario> {
        const result = await query(
            'INSERT INTO usuarios (usuario, contrasena) VALUES ($1, $2) RETURNING id_usuario, usuario',
            [usuario, contrasena]
        );
        return result.rows[0];
    }
}

