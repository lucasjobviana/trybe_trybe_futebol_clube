import { IMatch } from '../interfaces/IMatch';
import MatchModel from '../models/MatchModel';
import { IMatchModel } from '../interfaces/IMatchModel';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async getAll(): Promise<IMatch[]> {
    const allMatches = await this.matchModel.findAll();
    return allMatches;
  }
}
