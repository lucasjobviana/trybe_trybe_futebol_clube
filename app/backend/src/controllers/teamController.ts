import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class BookController {
  constructor(
    private userService = new TeamService(),
  ) { }

  public async findAll(_req: Request, res: Response) {
    const users = await this.userService.getAll();
    res.status(200).json(users);
  }
}
