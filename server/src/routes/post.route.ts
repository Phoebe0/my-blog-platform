import express, {Request, Response} from 'express';
import {getPosts, getPost, createPost, deletePost} from "../controllers/index.controller";

// const PostModel = models.PostModel;
// (models);
const router = express.Router(); // 使用 express.Router 类创建路由

router.get('/', getPosts)
router.get('/:slug', getPost)
router.post('/', createPost)
router.delete('/:id', deletePost)

export default router;