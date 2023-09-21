import { Request, Response } from 'express';
import AppResponseError from '../AppResponseError';
import UserService from '../services/UserService';

export default class BookController {
  constructor(
    private userService = new UserService(),
  ) { }

  private static loginProps = ['email', 'password'];

  private static validateLoginInput(body: any) {
    if (!BookController.loginProps.every((prop) => body[prop])) {
      throw new AppResponseError('All fields must be filled');
    }
  }

  public async findAll(_req: Request, res: Response) {
    const users = await this.userService.getAll();
    res.status(200).json(users);
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    BookController.validateLoginInput(req.body);

    const user = await this.userService.login({ email, password });
    res.status(200).json(user);
  }
}
