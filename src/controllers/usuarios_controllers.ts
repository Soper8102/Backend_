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

/**
 * POST /api/usuarios/registro
 * Recibe { usuario, contrasena } en el body.
 * Inserta el usuario en la BD y responde con 201.
 */
export const registrarUsuario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { usuario, contrasena } = req.body;

        if (!usuario || !contrasena) {
            res.status(400).json({ message: 'Usuario y contraseña son obligatorios' });
            return;
        }

        // Verificar si el usuario ya existe
        const usuarioExistente = await UsuarioModel.findByUsuario(usuario);
        if (usuarioExistente) {
            res.status(409).json({ message: 'El usuario ya se encuentra registrado' });
            return;
        }

        // Insertar en la BD
        const nuevoUsuario = await UsuarioModel.create(usuario, contrasena);

        res.status(201).json({
            message: 'Registro exitoso',
            usuario: nuevoUsuario
        });

    } catch (error) {
        next(error);
    }
};

/**
 * GET /api/usuarios
 * Retorna todos los usuarios registrados en la base de datos.
 */
export const obtenerUsuarios = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const usuarios = await UsuarioModel.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        next(error);
    }
};
