import SequelizeTeamModel from '../database/models/SequelizeTeamModel';
import { ITeams } from '../interfaces/ITeams';
import { ITeamModel } from '../interfaces/ITeamModel';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeamModel;

  async findById(id: number): Promise<ITeams> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) {
      throw new Error('Team not found');
    }
    return { id: dbData.id, teamName: dbData.teamName };
  }

  async findAll(opcaoWhere = {}): Promise<ITeams[]> {
    const dbData = await this.model.findAll({ ...opcaoWhere });
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findTwoTeamsById(id1: number, id2: number): Promise<ITeams[]> {
    const dbData = await this.findAll({ where: { id: [id1, id2] } });
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findAllWithMatches():Promise<ITeams[]> {
    console.log('heelo again');
    const dbData = await this.model.findAll({
      where: { id: 1 },
      include: [{ model: SequelizeMatchModel, as: 'matches' }],
    });
    console.log('heelo');
    console.log(dbData);
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }
}
