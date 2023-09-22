import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(objWhere:object): Promise<IMatch[]>,
  findAllInProgress(): Promise<IMatch[]>,
  findAllNotInProgress(): Promise<IMatch[]>,
}
