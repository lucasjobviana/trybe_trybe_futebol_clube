import AppResponseError from '../AppResponseError';
import { IMatch } from '../interfaces/IMatch';
import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../interfaces/IMatchModel';
import { TMatchToCreate } from '../interfaces/types/TMatchToCreate';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public static validateCreateInput(userToLogin: TMatchToCreate):void {
    if (userToLogin.awayTeamId === userToLogin.homeTeamId) {
      throw new AppResponseError('It is not possible to create a match with two equal teams');
    }
  }

  public async create(match: IMatch): Promise<IMatch> {
    MatchService.validateCreateInput(match);
    const teams = await this.matchModel.findAll(
      { where: { homeTeamId: match.homeTeamId, awayTeamId: match.awayTeamId } },
    );
    if (teams.length !== 2) throw new AppResponseError('There is no team with such id!');

    const createdMatch = await this.matchModel.create(match);
    return createdMatch;
  }

  public async updateProgress(match: IMatch): Promise<IMatch> {
    const { id, inProgress } = match;
    const hasUpdate = await this.matchModel.updateProgress(id, inProgress);
    return hasUpdate;
  }

  public async updateGoals(match: IMatch): Promise<IMatch> {
    const { id, homeTeamGoals, awayTeamGoals } = match;
    const hasUpdate = await this.matchModel.updateGoals(id, homeTeamGoals, awayTeamGoals);
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
