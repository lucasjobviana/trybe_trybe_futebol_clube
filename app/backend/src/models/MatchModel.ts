import { TSequelizeMatchWithTeams } from '../interfaces/types/TSequelizeMatchWithTeams';
import SequelizeTeamModel from '../database/models/SequelizeTeamModel';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel';
import { IMatch } from '../interfaces/IMatch';
import { IMatchModel } from '../interfaces/IMatchModel';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatchModel;

  public async create(match: IMatch): Promise<IMatch> {
    const createdMatch = await this.model.create(match);
    return createdMatch;
  }

  public async updateProgress(id: number, inProgress:boolean): Promise<IMatch> {
    const match = await this.model.findByPk(id);
    if (!match) {
      throw new Error('Match not found');
    }
    const matchUpdated = await match.update({ inProgress }, { where: { id } });
    return matchUpdated;
  }

  public async updateGoals(id: number, homeTeamGoals: number, awayTeamGoals: number)
    : Promise<IMatch> {
    const match = await this.model.findByPk(id);
    if (!match) {
      throw new Error('Match not found');
    }
    const matchUpdated = await match.update({ homeTeamGoals,
      awayTeamGoals }, { where: { id } });
    return matchUpdated;
  }

  async findAll(whereOptions = {}): Promise<IMatch[]> {
    const dbData1 = await this.model.findAll({ //      where: { inProgress: isInProgress },
      ...whereOptions,
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
