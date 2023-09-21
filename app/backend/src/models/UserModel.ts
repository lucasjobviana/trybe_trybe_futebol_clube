import AppResponseError from '../AppResponseError';
import SequelizeUserModel from '../database/models/SequelizeUserModel';
import { IUser } from '../interfaces/IUser';
import { IUserModel } from '../interfaces/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUserModel;

  async findAll(): Promise<IUser[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, username, role, password, email }) => (
      { id, username, role, password, email }
    ));
  }

  async login(email: string): Promise<IUser> {
    const dbData = await this.model.findOne({ where: { email } });
    if (!dbData) throw new AppResponseError('Invalid email or password');
    return dbData.dataValues;
  }
}
