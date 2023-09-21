import { ITeams } from './ITeams';

export interface ITeamModel {
  findAll(): Promise<ITeams[]>,
  findById(id: number): Promise<ITeams>,
}
