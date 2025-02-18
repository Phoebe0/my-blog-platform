import express, {Request, Response} from 'express';

const router = express.Router();

router.get('/comments', (req: Request, res: Response) => {
    res.status(200).send('comment');
});

export default router;