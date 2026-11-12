import { Router } from 'express';
import { loginUsuario } from '../controllers/usuarios_controllers';

const router = Router();

// Endpoint: POST /api/usuarios
router.post('/', loginUsuario);

export default router;

