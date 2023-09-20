import { IUser } from './IUser';

export interface IUserModel {
  findAll(): Promise<IUser[]>,
}
