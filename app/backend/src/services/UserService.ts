import { IUser } from '../interfaces/IUser';
import UserModel from '../models/UserModel';
import { IUserModel } from '../interfaces/IUserModel';

export default class BookService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async getAll(): Promise<IUser[]> {
    const allUsers = await this.userModel.findAll();
    return allUsers;
  }
}
