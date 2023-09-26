import { Request, Router, Response } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();
const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => teamController.findAllWithMatchesDetails(req, res),
);

export default router;
