import { Request, Router, Response } from 'express';
import UserController from '../controllers/UserController';

const userController = new UserController();
const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => userController.findAll(req, res),
);

export default router;
