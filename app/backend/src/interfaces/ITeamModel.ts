import { ITeams } from './ITeams';

export interface ITeamModel {
  findAll(whereOption:object): Promise<ITeams[]>,
  findById(id: number): Promise<ITeams>,
  findTwoTeamsById(id1: number, id2: number): Promise<ITeams[]>,
  findAllWithMatches(): Promise<ITeams[]>,
}
