import express, {Request, Response} from 'express';
import {getUserSavedPosts, savePost} from '../controllers/user.controller';

const router = express.Router();

router.get('/saved', getUserSavedPosts)
router.post('/save', savePost)

export default router;