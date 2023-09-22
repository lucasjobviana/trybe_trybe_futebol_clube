import { Request, Router, Response, NextFunction } from 'express';
import checkUserAuthentication from '../middlewares/checkUserAuthentication';
import UserController from '../controllers/UserController';

const userController = new UserController();
const router = Router();

router.post(
  '/',
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  (req: Request, res: Response, next:NextFunction) => checkUserAuthentication(req, res, next),
  (req: Request, res: Response) => UserController.getRoleByUserToken(req, res),
);

export default router;
