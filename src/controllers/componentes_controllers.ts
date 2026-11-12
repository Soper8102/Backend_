import { Request, Response, NextFunction } from 'express';
import { ComponenteModel, CategoriaModel } from '../models/componente_models';

// GET: Obtener todos los componentes con nombre de categoría
export const getComponentes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const componentes = await ComponenteModel.getAll();
        res.status(200).json(componentes);
    } catch (error) {
        next(error);
    }
};

// GET: Obtener componente por ID
export const getComponenteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(String(req.params.id), 10);
        const componente = await ComponenteModel.getById(id);

        if (!componente) {
            res.status(404).json({ message: 'Componente no encontrado' });
            return;
        }

        res.status(200).json(componente);
    } catch (error) {
        next(error);
    }
};

// POST: Crear un nuevo componente
export const createComponente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { nombre, descripcion, precio, unidades, categoria_id, marca, estado } = req.body;
        const nuevoComponente = await ComponenteModel.create({
            nombre,
            descripcion,
            precio,
            unidades,
            categoria_id,
            marca,
            estado
        });
        res.status(201).json(nuevoComponente);
    } catch (error) {
        next(error);
    }
};

// PUT: Actualizar componente completo
export const updateComponente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(String(req.params.id), 10);
        const { nombre, descripcion, precio, unidades, categoria_id, marca, estado } = req.body;
        const componenteActualizado = await ComponenteModel.update(id, {
            nombre,
            descripcion,
            precio,
            unidades,
            categoria_id,
            marca,
            estado
        });

        if (!componenteActualizado) {
            res.status(404).json({ message: 'Componente no encontrado' });
            return;
        }

        res.status(200).json(componenteActualizado);
    } catch (error) {
        next(error);
    }
};

// DELETE: Eliminar componente
export const deleteComponente = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(String(req.params.id), 10);
        const componenteEliminado = await ComponenteModel.delete(id);

        if (!componenteEliminado) {
            res.status(404).json({ message: 'Componente no encontrado' });
            return;
        }

        res.status(200).json({ message: 'Componente eliminado', componente: componenteEliminado });
    } catch (error) {
        next(error);
    }
};

// GET: Obtener todas las categorías
export const getCategorias = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const categorias = await CategoriaModel.getAll();
        res.status(200).json(categorias);
    } catch (error) {
        next(error);
    }
};
