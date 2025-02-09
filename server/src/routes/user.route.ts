import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/usertest', (req: Request, res: Response) => {
    res.status(200).send('user');
});

export default router;