import { Request, Router, Response } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();
const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => teamController.findAllWithMatchesDetails(req, res),
);

router.get(
  '/home',
  (req: Request, res: Response) => teamController.findAllHomeWithMatchesDetails(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => teamController.findAllAwayWithMatchesDetails(req, res),
);

export default router;
