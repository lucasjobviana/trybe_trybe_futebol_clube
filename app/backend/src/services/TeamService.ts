import { ITeams } from '../interfaces/ITeams';
import TeamModel from '../models/TeamModel';
import { ITeamModel } from '../interfaces/ITeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getAll(): Promise<ITeams[]> {
    const allTeams = await this.teamModel.findAll();
    return allTeams;
  }
}
