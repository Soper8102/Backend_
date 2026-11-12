import { Request, Response, NextFunction } from 'express';
import { UsuarioModel } from '../models/usuario_models';

/**
 * POST /api/usuarios
 * Recibe { usuario, contrasena } en el body.
 * Si coinciden con un registro en la BD, responde con los datos del usuario.
 * Si no coinciden, responde con error 401.
 */
export const loginUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { usuario, contrasena } = req.body;

        // Validación básica: que vengan los dos campos
        if (!usuario || !contrasena) {
            res.status(400).json({ message: 'Usuario y contraseña son obligatorios' });
            return;
        }

        // Buscar en la BD si existe un usuario con esas credenciales
        const user = await UsuarioModel.login(usuario, contrasena);

        if (!user) {
            // No encontró coincidencia → credenciales incorrectas
            res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            return;
        }

        // Login exitoso → devolver datos del usuario (sin la contraseña)
        res.status(200).json({
            message: 'Login exitoso',
            id_usuario: user.id_usuario,
            usuario: user.usuario
        });

    } catch (error) {
        next(error);
    }
};
