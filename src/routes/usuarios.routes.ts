import { Router } from 'express';
import { loginUsuario, registrarUsuario } from '../controllers/usuarios_controllers';

const router = Router();

// Endpoints de usuarios:
// POST /api/usuarios (login tradicional)
router.post('/', loginUsuario);

// POST /api/usuarios/login
router.post('/login', loginUsuario);

// POST /api/usuarios/registro
router.post('/registro', registrarUsuario);

export default router;

