import { Router } from 'express';
import { getClientes, getClienteById, createCliente } from '../controllers/clientes_controllers';

const router = Router();

// Endpoint base: /api/v1/clientes
router.get('/', getClientes);
router.get('/:id', getClienteById);
router.post('/', createCliente);

export default router;
