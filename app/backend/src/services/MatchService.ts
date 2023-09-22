import { IMatch } from '../interfaces/IMatch';
import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../interfaces/IMatchModel';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async update(match: IMatch): Promise<IMatch> {
    const { id, homeTeamGoals, awayTeamGoals } = match;
    const hasUpdate = await this.matchModel.update(id, homeTeamGoals, awayTeamGoals);
    return hasUpdate;
  }

  public async getAll(): Promise<IMatch[]> {
    const allMatches = await this.matchModel.findAll({});
    return allMatches;
  }

  public async getAllInProgress(): Promise<IMatch[]> {
    const allMatches = await this.matchModel.findAllInProgress();
    return allMatches;
  }

  public async getAllNotInProgress(): Promise<IMatch[]> {
    const allMatches = await this.matchModel.findAllNotInProgress();
    return allMatches;
  }
}
