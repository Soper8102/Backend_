import express from 'express';
import cors from 'cors';

import clientesRoutes from './routes/clientes.routes';
import componentesRoutes from './routes/componentes.routes';
import perrosRoutes from './routes/perros.routes';
import usuariosRoutes from './routes/usuarios.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/api/v1/health', (req, res) => {
    res.json({
        status: 'OK'
    });
});

app.use(
    '/api/v1/clientes',
    clientesRoutes
);

app.use(
    '/api/v1/componentes',
    componentesRoutes
);

app.use(
    '/api/v1/perros',
    perrosRoutes
);

app.use(
    '/api/usuarios',
    usuariosRoutes
);

app.use(errorHandler);

export default app;
