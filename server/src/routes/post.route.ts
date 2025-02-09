import express, {Request, Response} from 'express';

const router = express.Router(); // 使用 express.Router 类创建路由

router.get('/posttest', (req: Request, res: Response) => {
    res.status(200).send('post');
});

export default router;