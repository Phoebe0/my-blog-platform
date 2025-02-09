import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/commenttest', (req: Request, res: Response) => {
    res.status(200).send('comment');
});

export default router;