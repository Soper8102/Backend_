import { Router } from 'express';
import { getPerros, getPerroById, createPerro } from '../controllers/perros_controllers';

const router = Router();

// Endpoint base: /api/v1/perros
router.get('/', getPerros);
router.get('/:id', getPerroById);
router.post('/', createPerro);

export default router;