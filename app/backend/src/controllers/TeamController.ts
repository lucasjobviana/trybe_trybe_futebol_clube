import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.teamService.getById(Number(id));
    res.status(200).json(team);
  }

  public async findAll(_req: Request, res: Response) {
    const teams = await this.teamService.getAll();
    res.status(200).json(teams);
  }

  public async findAllHomeWithMatchesDetails(_req: Request, res: Response) {
    const teams = await this.teamService.getAllHomeWithMatchesDetails();
    res.status(200).json(teams);
  }

  public async findAllAwayWithMatchesDetails(_req: Request, res: Response) {
    const teams = await this.teamService.getAllAwayWithMatchesDetails();
    res.status(200).json(teams);
  }
}
