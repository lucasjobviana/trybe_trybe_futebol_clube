import { Request, Response } from 'express';
import { IMatch } from '../interfaces/IMatch';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  // public async update(req: Request, res: Response) {
  //   const { id: stringId } = req.params;
  //   const id = Number(stringId);
  //   const { homeTeamGoals, awayTeamGoals, inProgress = false } = req.body;
  //   await this.matchService.update({
  //     id, homeTeamGoals, awayTeamGoals, inProgress } as IMatch);
  //   res.status(200).json({ message: 'Finished' });
  // }

  public async updateProgress(req: Request, res: Response) {
    const { id: stringId } = req.params;
    const id = Number(stringId);
    // const { inProgress } = req.body;
    await this.matchService.updateProgress({
      id, inProgress: false } as IMatch);
    res.status(200).json({ message: 'Finished' });
  }

  public async updateGoals(req: Request, res: Response) {
    const { id: stringId } = req.params;
    const id = Number(stringId);
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchService.updateGoals({ id, homeTeamGoals, awayTeamGoals } as IMatch);
    res.status(200).json({ message: 'Finished' });
  }

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
