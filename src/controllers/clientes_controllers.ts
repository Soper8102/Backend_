import { Request, Response, NextFunction } from 'express';
import { ClienteModel } from '../models/cliente_models';

export const getClientes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const clientes = await ClienteModel.getAll();
        res.status(200).json(clientes);
    } catch (error) {
        next(error);
    }
};

export const getClienteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(String(req.params.id), 10);
        const cliente = await ClienteModel.getById(id);

        if (!cliente) {
            res.status(404).json({ message: 'Cliente no encontrado' });
            return;
        }

        res.status(200).json(cliente);
    } catch (error) {
        next(error);
    }
};

export const createCliente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { nombre, apellido, email, telefono, direccion, estado } = req.body;
        const nuevoCliente = await ClienteModel.create({
            nombre,
            apellido,
            email,
            telefono,
            direccion,
            estado
        });
        res.status(201).json(nuevoCliente);
    } catch (error) {
        next(error);
    }
};
