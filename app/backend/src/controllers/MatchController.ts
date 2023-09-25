import { Request, Response } from 'express';
import { IMatch } from '../interfaces/IMatch';
import MatchService from '../services/MatchService';
import AppResponseError from '../AppResponseError';

export default class MatchController {
  constructor(
    private _createProps = ['homeTeamId', 'homeTeamGoals', 'awayTeamId', 'awayTeamGoals'],
    private matchService = new MatchService(),
  ) { }

  public static validateCreateProps(body: any, matchProps:string[]):void {
    if (!matchProps.every((prop) => body[prop] !== undefined)) {
      throw new AppResponseError('All fields must be filled');
    }
  }

  public async create(req: Request, res: Response) {
    MatchController.validateCreateProps(req.body, this._createProps);
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const match = await this.matchService.create({
      homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } as IMatch);
    res.status(201).json(match);
  }

  public async updateProgress(req: Request, res: Response) {
    const { id: stringId } = req.params;
    const id = Number(stringId);
    await this.matchService.updateProgress({
      id, inProgress: false } as IMatch);
    res.status(200).json({ message: 'Finished' });
  }

  public async updateGoals(req: Request, res: Response) {
    const { id: stringId } = req.params;
    const id = Number(stringId);
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchService.updateGoals({ id, homeTeamGoals, awayTeamGoals } as IMatch);
    res.status(200).json({ message: 'Points updated' });
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

// public async update(req: Request, res: Response) {
//   const { id: stringId } = req.params;
//   const id = Number(stringId);
//   const { homeTeamGoals, awayTeamGoals, inProgress = false } = req.body;
//   await this.matchService.update({
//     id, homeTeamGoals, awayTeamGoals, inProgress } as IMatch);
//   res.status(200).json({ message: 'Finished' });
// }
