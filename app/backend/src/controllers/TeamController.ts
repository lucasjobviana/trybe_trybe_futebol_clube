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

  public async findAllWithMatchesDetails(_req: Request, res: Response) {
    console.log('find all with matches details');
    const teams = await this.teamService.getAllWithMatchesDetails();
    res.status(200).json(teams);
  }
}
