import { ITeamWithMatchesDetails } from '../interfaces/ITeamWithMatchesDetails';

class TeamDetails implements ITeamWithMatchesDetails {
  private _totalPoints = 0;//
  private _totalGames = 0;//
  private _totalVictories = 0;//
  private _totalDraws = 0;//
  private _totalLosses = 0;//
  private _goalsFavor = 0;//
  private _goalsOwn = 0;//
  private _efficiency = '0';
  private _goalsBalance = 0;

  public get name():string { return this._name; }
  public get id():number { return this._id; }
  public get totalPoints():number { return this._totalPoints; }
  public get totalGames():number { return this._totalGames; }
  public get totalVictories():number { return this._totalVictories; }
  public get totalDraws():number { return this._totalDraws; }
  public get totalLosses():number { return this._totalLosses; }
  public get goalsFavor():number { return this._goalsFavor; }
  public get goalsOwn():number { return this._goalsOwn; }
  public get efficiency():string { return this._efficiency; }
  public get goalsBalance():number { return this._goalsBalance; }

  private static formatNumber(num: number): string {
    const formattedNumber = num.toFixed(2);
    return formattedNumber.includes('.')
      ? formattedNumber
      : `${formattedNumber}.00`;
  }

  private updateEfficiency = () => {
    this._efficiency = TeamDetails.formatNumber(((
      this.totalPoints / (this.totalGames * 3)) * 100));
  };

  private updateBalance = () => {
    this._goalsBalance = (this.goalsFavor - this.goalsOwn);
  };

  private updateValues = (goalsOwn:number, goalsFavor:number) => {
    this._goalsFavor += goalsFavor;
    this._goalsOwn += goalsOwn;
    this._totalGames += 1;
    this.updateEfficiency();
    this.updateBalance();
  };

  public win = (goalsWinner:number, goalsLoser:number) => {
    this._totalPoints += 3;
    this._totalVictories += 1;
    this.updateValues(goalsLoser, goalsWinner);
    // if (loseTeam) loseTeam.lose(goalsWinner, goalsLoser, null);
  };

  public lose = (goalsWinner:number, goalsLoser:number) => {
    this._totalLosses += 1;
    this.updateValues(goalsWinner, goalsLoser);
    // if (winTeam) winTeam.win(null, goalsOwn, goalsFavor);
  };

  public draw = (goals:number) => {
    this._totalPoints += 1;
    this._totalDraws += 1;
    this.updateValues(goals, goals);
    // if (oponentTeam) oponentTeam.draw(goals, null);
  };

  constructor(private _name:string, private _id:number) {
    this._name = _name;
    this._id = _id;
  }
}

export default TeamDetails;
