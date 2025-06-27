import express from 'express';

import {
    getAll,
    getById,
    create,
    update,
    remove,
    getMedias,
    getAprovados
} from '../controllers/alunoController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAll);
router.get('/medias', getMedias);
router.get('/aprovados', getAprovados);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;