import { IMatch } from './IMatch';

export interface IMatchModel {
  update(id: number, scoreTeamA: number, scoreTeamB: number): Promise<IMatch>,
  findAll(objWhere:object): Promise<IMatch[]>,
  findAllInProgress(): Promise<IMatch[]>,
  findAllNotInProgress(): Promise<IMatch[]>,
}
