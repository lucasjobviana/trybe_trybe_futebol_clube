import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      const matchesInProgress = await this.matchService.getAllInProgress();
      res.status(200).json(matchesInProgress);
      return;
    }
    if (inProgress === 'false') {
      const matchesNotInProgress = await this.matchService.getAllNotInProgress();
      res.status(200).json(matchesNotInProgress);
      return;
    }

    const matches = await this.matchService.getAll();
    res.status(200).json(matches);
  }
}
