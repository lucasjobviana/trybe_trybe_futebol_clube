import { Request, Response } from 'express';
import AppResponseError from '../AppResponseError';
import UserService from '../services/UserService';

export default class UserController {
  constructor(
    private _loginProps = ['email', 'password'],
    private userService = new UserService(),
  ) { }

  public static validateLoginProps(body: any, loginProps:string[]):void {
    if (!loginProps.every((prop) => body[prop])) {
      throw new AppResponseError('All fields must be filled');
    }
  }

  public async findAll(_req: Request, res: Response) {
    const users = await this.userService.getAll();
    res.status(200).json(users);
  }

  public static getRoleByUserToken(req: Request, res: Response) {
    res.status(200).json({ role: req.body.user.data.role });
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    UserController.validateLoginProps(req.body, this._loginProps);
    const user = await this.userService.login({ email, password });
    res.status(200).json(user);
  }
}
