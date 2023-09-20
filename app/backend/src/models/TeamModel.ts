import SequelizeTeamModel from '../database/models/SequelizeTeamModel';
import { ITeams } from '../interfaces/ITeams';
import { ITeamModel } from '../interfaces/ITeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeamModel;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }
}
