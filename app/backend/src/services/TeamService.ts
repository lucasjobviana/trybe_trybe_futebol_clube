import { ITeams } from '../interfaces/ITeams';
import TeamModel from '../models/TeamModel';
import { ITeamModel } from '../interfaces/ITeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getById(id: number): Promise<ITeams> {
    const oneTeam = await this.teamModel.findById(id);
    return oneTeam;
  }

  public async getAll(): Promise<ITeams[]> {
    const allTeams = await this.teamModel.findAll();
    return allTeams;
  }
}
