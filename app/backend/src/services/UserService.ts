import * as bcrypt from 'bcryptjs';
import { TUserToLogin } from '../interfaces/types/IUserToLogin';
import AppResponseError from '../AppResponseError';
import { IUser } from '../interfaces/IUser';
import UserModel from '../models/UserModel';
import { IUserModel } from '../interfaces/IUserModel';
import getNewToken from '../auth';

type Token = {
  token: string
};
export default class BookService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async getAll(): Promise<IUser[]> {
    const allUsers = await this.userModel.findAll();
    return allUsers;
  }

  public async login(userToLogin: TUserToLogin): Promise<Token> {
    const user = await this.userModel.login(userToLogin.email);

    if (!user
      || !bcrypt.compare(userToLogin.password, user.password)) {
      throw new AppResponseError('Invalid email or password');
    }

    return { token: getNewToken(user) };
  }
}
