import express from 'express';
import {getPostComments, addComment, deletePostComment} from "../controllers/comment.controller";

const router = express.Router();

router.get('/:postId', getPostComments)
router.post('/:postId', addComment)
router.delete('/:id', deletePostComment)


export default router;