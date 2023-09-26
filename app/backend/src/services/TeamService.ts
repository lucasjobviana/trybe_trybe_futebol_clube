import { IMatchModel } from '../interfaces/IMatchModel';
import MatchModel from '../models/MatchModel';
import { ITeams } from '../interfaces/ITeams';
import TeamModel from '../models/TeamModel';
import { ITeamModel } from '../interfaces/ITeamModel';
import { ITeamWithMatchesDetails } from '../interfaces/ITeamWithMatchesDetails';
import TeamDetails from './TeamDetails';
import { IMatch } from '../interfaces/IMatch';

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

  private static convertToITeamWithMatchesDetails(currentTeam:ITeamWithMatchesDetails) {
    return {
      name: currentTeam.name,
      totalPoints: currentTeam.totalPoints,
      totalGames: currentTeam.totalGames,
      totalVictories: currentTeam.totalVictories,
      totalDraws: currentTeam.totalDraws,
      totalLosses: currentTeam.totalLosses,
      goalsFavor: currentTeam.goalsFavor,
      goalsOwn: currentTeam.goalsOwn,
      goalsBalance: currentTeam.goalsBalance,
      efficiency: currentTeam.efficiency,
    };
  }

  private static resolvesMatch(team:TeamDetails, team1:number, team2:number) {
    if (team1 > team2) { // 1:home
      team.lose(team1, team2);
    } else if (team1 < team2) {
      team.win(team2, team1);
    } else {
      team.draw(team1);
    }
  }

  private static info(allTeams:ITeams[], allMatches: IMatch[], r: ITeamWithMatchesDetails[] = []) {
    allTeams.forEach((team) => {
      const currentTeam = new TeamDetails(team.teamName, team.id);
      const allCurrentTeamHome = allMatches.filter((match) =>
        match.homeTeamId === team.id);
      // const allCurrentTeamAway = allMatches.filter((match) =>
      //   match.awayTeamId === team.id);

      allCurrentTeamHome.forEach((match) => { // quando time é home
        TeamService.resolvesMatch(currentTeam, match.awayTeamGoals, match.homeTeamGoals);
      });

      // allCurrentTeamAway.forEach((match) => { // quando time é away
      //   TeamService.resolvesMatch(currentTeam, match.homeTeamGoals, match.awayTeamGoals);
      // });

      r.push(TeamService.convertToITeamWithMatchesDetails(currentTeam));
    });
    return r;
  }

  private static order(teamsDetails:ITeamWithMatchesDetails[]) {
    const ordenedTeams = teamsDetails.sort((
      a,
      b,
    ) => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      return 0;
    });// return ordenedTeams.slice(0, 10);
    return ordenedTeams;
  }

  public async getAllWithMatchesDetails():Promise<ITeamWithMatchesDetails[]> {
    const allTeams = await this.teamModel.findAll({ });
    const allMatches = await this.matchModel.findAll({ where: { inProgress: false } });
    const teamsDetails = TeamService.info(allTeams, allMatches);
    const ordenedTeams = TeamService.order(teamsDetails);
    return ordenedTeams;
  }
}
