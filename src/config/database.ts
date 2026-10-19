import { Cliente } from '../models/cliente_models';


export const clientesDB: Cliente[] = [
    {
        id: 1,
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan.perez@example.com',
        telefono: '3001234567',
        direccion: 'Calle 10 # 20-30',
        estado: 'activo'
    },
    {
        id: 2,
        nombre: 'María',
        apellido: 'Gómez',
        email: 'maria.gomez@example.com',
        telefono: '3109876543',
        direccion: 'Carrera 45 # 12-50',
        estado: 'activo'
    },
    {
        id: 3,
        nombre: 'Carlos',
        apellido: 'Ruiz',
        email: 'carlos.ruiz@example.com',
        telefono: '3205551234',
        direccion: 'Avenida 68 # 80-15',
        estado: 'inactivo'
    }
];
