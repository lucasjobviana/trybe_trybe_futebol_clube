import * as bcrypt from 'bcryptjs';
import { TUserToLogin } from '../interfaces/types/IUserToLogin';
import AppResponseError from '../AppResponseError';
import { IUser } from '../interfaces/IUser';
import UserModel from '../models/UserModel';
import { IUserModel } from '../interfaces/IUserModel';
import getNewToken from '../auth';
import loginInputValidator = require('./validations/validators/loginInput.validator');

type Token = {
  token: string
};
export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async getAll(): Promise<IUser[]> {
    const allUsers = await this.userModel.findAll();
    return allUsers;
  }

  public static validateLoginInput(userToLogin: TUserToLogin) {
    loginInputValidator(userToLogin);
  }

  public async login(userToLogin: TUserToLogin): Promise<Token> {
    console.log('Este é o userToLogin: ', userToLogin);
    UserService.validateLoginInput(userToLogin);
    console.log('não foi lançado erro');
    const user = await this.userModel.login(userToLogin.email);

    if (!user
      || !bcrypt.compareSync(userToLogin.password, user.password)) {
      throw new AppResponseError('Invalid email or password');
    }

    return { token: getNewToken(user) };
  }
}
