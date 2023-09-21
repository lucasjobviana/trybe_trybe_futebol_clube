import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class BookController {
  constructor(
    private userService = new TeamService(),
  ) { }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.userService.getById(Number(id));
    res.status(200).json(user);
  }

  public async findAll(_req: Request, res: Response) {
    const users = await this.userService.getAll();
    res.status(200).json(users);
  }
}
