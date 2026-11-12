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
}

