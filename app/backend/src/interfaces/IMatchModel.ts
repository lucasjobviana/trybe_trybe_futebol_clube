import { IMatch } from './IMatch';

export interface IMatchModel {
  updateProgress(id: number, inProgress:boolean): Promise<IMatch>,
  updateGoals(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<IMatch>,
  findAll(objWhere:object): Promise<IMatch[]>,
  findAllInProgress(): Promise<IMatch[]>,
  findAllNotInProgress(): Promise<IMatch[]>,
}
