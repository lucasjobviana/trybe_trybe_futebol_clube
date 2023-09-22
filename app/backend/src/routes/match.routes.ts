import { Request, Router, Response, NextFunction } from 'express';
import MatchController from '../controllers/matchController';
import checkUserAuthentication from '../middlewares/checkUserAuthentication';

const matchController = new MatchController();
const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchController.findAll(req, res),
);

router.patch(
  '/:id/finish',
  (req: Request, res: Response, next:NextFunction) => checkUserAuthentication(req, res, next),
  (req: Request, res: Response) => matchController.update(req, res),
);

export default router;
