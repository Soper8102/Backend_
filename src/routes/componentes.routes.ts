import { Router } from 'express';
import {
    getComponentes,
    getComponenteById,
    createComponente,
    updateComponente,
    deleteComponente,
    getCategorias
} from '../controllers/componentes_controllers';

const router = Router();

// Endpoint base: /api/v1/componentes
router.get('/', getComponentes);
router.get('/categorias', getCategorias);
router.get('/:id', getComponenteById);
router.post('/', createComponente);
router.put('/:id', updateComponente);
router.delete('/:id', deleteComponente);

export default router;
