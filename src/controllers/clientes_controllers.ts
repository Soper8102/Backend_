import { Request, Response, NextFunction } from 'express';
import { clientesDB } from '../config/database';
import { Cliente } from '../models/cliente_models';

// GET: Obtener todos los clientes (el que usará tu tabla de Angular)
export const getClientes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        res.status(200).json(clientesDB);
    } catch (error) {
        next(error);
    }
};

// GET: Obtener cliente por ID
export const getClienteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(String(req.params.id), 10);
        const cliente = clientesDB.find(c => c.id === id);

        if (!cliente) {
            res.status(404).json({ message: 'Cliente no encontrado' });
            return;
        }

        res.status(200).json(cliente);
    } catch (error) {
        next(error);
    }
};

// POST: Crear un nuevo cliente
export const createCliente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const nuevoCliente: Cliente = {
            id: clientesDB.length + 1,
            nombre: req.body.nombre,
            email: req.body.email,
            telefono: req.body.telefono,
            direccion: req.body.direccion,
            estado: req.body.estado || 'activo'
        };

        clientesDB.push(nuevoCliente);
        res.status(201).json(nuevoCliente);
    } catch (error) {
        next(error);
    }
};
