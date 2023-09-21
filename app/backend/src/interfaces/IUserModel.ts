import { IUser } from './IUser';

export interface IUserModel {
  findAll(): Promise<IUser[]>,
  login(email:string): Promise<IUser>,
}
