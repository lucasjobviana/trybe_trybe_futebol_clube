import { Request, Router, Response, NextFunction } from 'express';
import MatchController from '../controllers/MatchController';
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
  (req: Request, res: Response) => matchController.updateProgress(req, res),
);

router.patch(
  '/:id',
  (req: Request, res: Response, next:NextFunction) => checkUserAuthentication(req, res, next),
  (req: Request, res: Response) => matchController.updateGoals(req, res),
);

router.post(
  '/',
  (req: Request, res: Response, next:NextFunction) => checkUserAuthentication(req, res, next),
  (req: Request, res: Response) => matchController.create(req, res),
);

export default router;
