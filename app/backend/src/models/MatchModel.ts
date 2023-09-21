import SequelizeMatchModel from '../database/models/SequelizeMatchModel';
import { IMatch } from '../interfaces/IMatch';
import { IMatchModel } from '../interfaces/IMatchModel';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatchModel;

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress  }) => (
      { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }
    ));
  }
}
