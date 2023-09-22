import { TSequelizeMatchWithTeams } from '../interfaces/types/TSequelizeMatchWithTeams';
import SequelizeTeamModel from '../database/models/SequelizeTeamModel';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel';
import { IMatch } from '../interfaces/IMatch';
import { IMatchModel } from '../interfaces/IMatchModel';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatchModel;

  async findAll(opcaoWhere = {}): Promise<IMatch[]> {
    const dbData1 = await this.model.findAll({ //      where: { inProgress: isInProgress },
      ...opcaoWhere,
      include: [
        { model: SequelizeTeamModel, as: 'homeTeam' },
        { model: SequelizeTeamModel, as: 'awayTeam' },
      ],
    }) as unknown as TSequelizeMatchWithTeams [];
    return dbData1.map(({ id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals,
      inProgress, homeTeam, awayTeam }) => ({ id,
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress,
      homeTeam: { teamName: homeTeam.dataValues.teamName },
      awayTeam: { teamName: awayTeam.dataValues.teamName },
    }
    ));
  }

  async findAllInProgress(): Promise<IMatch[]> {
    const matchInProgress = await this.findAll({ where: { inProgress: true } });
    return matchInProgress;
  }

  async findAllNotInProgress(): Promise<IMatch[]> {
    const matchInProgress = await this.findAll({ where: { inProgress: false } });
    return matchInProgress;
  }
}

// return dbData.map(({ id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals,
//   inProgress }) => (
//   { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }
// ));
