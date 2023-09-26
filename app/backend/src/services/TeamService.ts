import { IMatchModel } from '../interfaces/IMatchModel';
import MatchModel from '../models/MatchModel';
import { ITeams } from '../interfaces/ITeams';
import TeamModel from '../models/TeamModel';
import { ITeamModel } from '../interfaces/ITeamModel';
import { ITeamWithMatchesDetails } from '../interfaces/ITeamWithMatchesDetails';
import TeamDetails from './TeamDetails';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
    private matchModel: IMatchModel = new MatchModel(),
  ) { }

  public async getById(id: number): Promise<ITeams> {
    const oneTeam = await this.teamModel.findById(id);
    return oneTeam;
  }

  public async getAll(): Promise<ITeams[]> {
    const allTeams = await this.teamModel.findAll({});
    return allTeams;
  }

  public async getAllWithMatchesDetails() {
    const allTeams = await this.teamModel.findAll({});
    const allMatches = await this.matchModel.findAll({ where: { inProgress: false } });
    const myReturn = [];

    allTeams.forEach((team) => {
      const currentTeam = new TeamDetails(team.teamName);
      const allCurrentTeamHome = allMatches.filter((match) =>
        match.homeTeamId === team.id);
      const allCurrentTeamAway = allMatches.filter((match) =>
        match.awayTeamId === team.id);

        allCurrentTeamHome.forEach((match) => {
        if (match.awayTeamGoals > match.homeTeamGoals) {
          currentTeam.lose(match.awayTeamGoals, match.homeTeamGoals,null);
        } else if (match.awayTeamGoals < match.homeTeamGoals) {
          currentTeam.win(null,match.homeTeamGoals, match.awayTeamGoals);
        }else{
          currentTeam.draw(match.awayTeamGoals,null)
        }
      });

      allCurrentTeamAway.forEach((match) => {
        if (match.awayTeamGoals > match.homeTeamGoals) {
          currentTeam.win(null, match.awayTeamGoals, match.homeTeamGoals);
        } else if (match.awayTeamGoals < match.homeTeamGoals) {
          currentTeam.lose(match.homeTeamGoals, match.awayTeamGoals, null);
        }else{
          currentTeam.draw(match.awayTeamGoals,null)
        }
      });

      console.log(`Time ${currentTeam.name}`)
      console.log(`Total Partidas: ${currentTeam.totalGames}`);
      console.log(`Total Vitorias: ${currentTeam.totalVictories}`);
      console.log(allCurrentTeamHome)
      console.log(allCurrentTeamAway)
      myReturn.push({
        name:currentTeam.name,
        totalPoints: currentTeam.totalPoints,
        totalGames: currentTeam.totalGames,
        totalVictories: currentTeam.totalVictories,
        totalDraws: currentTeam.totalDraws,
        totalLosses: currentTeam.totalLosses,
        goalsFavor: currentTeam.goalsFavor,
        goalsOwn: currentTeam.goalsOwn,
        goalsBalance: currentTeam.goalsBalance,
        efficiency: currentTeam.efficiency,
      })
    });
    return myReturn;
  }
}
