import express from 'express'
import { createDetail, deleteDetail, getDetail, getDetails, updateDetail } from '../controllers/postsController.js';
import authMiddleware from '../middleware/authMiddleWare.js';


export const router = express();

router.get('/', authMiddleware, getDetails);
router.get('/:id', getDetail);
router.post('/create', authMiddleware, createDetail);
router.put('/update/:id', authMiddleware, updateDetail);
router.delete('/delete', deleteDetail);