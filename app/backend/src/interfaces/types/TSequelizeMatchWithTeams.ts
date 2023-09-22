import SequelizeTeamModel from '../../database/models/SequelizeTeamModel';
import { IMatch } from '../IMatch';

export type TSequelizeMatchWithTeams = IMatch & {
  homeTeam: SequelizeTeamModel,
  awayTeam: SequelizeTeamModel
};
