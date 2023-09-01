import { Router, Request, Response } from 'express';
import { LoginController } from './controllers/login';

const router = Router();

const loginController = new LoginController();

router.use('/login', loginController.router);

router.get('/', async (req: Request, res: Response) => {
    res.status(200).json({'message': 'Wubba Lubba Dub Dub!'});
});

export default router;