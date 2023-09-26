const team = {
    id: 1,
    teamName: 'Time 1',
};

const team2 = {
  id: 2,
  teamName: 'Time 2',
};

const teamDetail = {
  name: 'Time 1',
  totalPoints: 0,
  totalGames: 1,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 1,
  goalsFavor: 1,
  goalsOwn: 2,
  goalsBalance: -1,
  efficiency: '0.00'
}

const teamDetail2 = {
  name: 'Time 2',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '0'
}

const teamDetailAway = {
  name: 'Time 1',
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 2,
    goalsOwn: 1,
    goalsBalance: 1,
    efficiency: '100.00'
}

const teamDetailAway2 = {
  name: 'Time 2',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: '0'
}



const teams = [team,team2];
const teamsDetailsHome = [teamDetail2, teamDetail]
const teamsDetailsAway = [teamDetailAway,teamDetailAway2]
// const teamsDetails = []

  
  export {
    team,
    teams,
    teamsDetailsHome,
    teamsDetailsAway,
  };