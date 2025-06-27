import express from 'express';
import authRoutes from './routes/authRoutes.js';
import alunoRoutes from './routes/alunoRoutes.js';

const app = express();

app.use(express.json());

app.use(authRoutes); // /register e /login
app.use('/alunos', alunoRoutes); // protegido por JWT

export default app;