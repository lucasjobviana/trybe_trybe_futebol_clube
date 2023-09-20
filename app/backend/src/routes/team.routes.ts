import { Request, Router, Response } from 'express';
import TeamController from '../controllers/teamController';

const teamController = new TeamController();
const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => teamController.findAll(req, res),
);

export default router;
