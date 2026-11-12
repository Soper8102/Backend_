import { Request, Response, NextFunction } from 'express';
import { Perro } from '../models/perro_models';

// GET: Obtener todos los perros en formato JSON
export const getPerros = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const perros = await Perro.getAll();
        res.status(200).json(perros);
    } catch (error) {
        next(error);
    }
};

// GET: Obtener perro por ID
export const getPerroById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(String(req.params.id), 10);
        const perro = await Perro.getById(id);

        if (!perro) {
            res.status(404).json({ message: 'Perro no encontrado' });
            return;
        }

        res.status(200).json(perro);
    } catch (error) {
        next(error);
    }
};

// POST: Crear un nuevo perro
export const createPerro = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { nombre, edad, raza, color } = req.body;
        const nuevoPerro = await Perro.create({ nombre, edad, raza, color });
        res.status(201).json(nuevoPerro);
    } catch (error) {
        next(error);
    }
};
