import { Sequelize } from "sequelize";
import { IMatch } from "../../interfaces/IMatch";
import { TSequelizeMatchWithTeams } from "../../interfaces/types/TSequelizeMatchWithTeams";
import SequelizeTeamModel from "../../database/models/SequelizeTeamModel";

const match:IMatch = {
    id: 1,
    homeTeamId: 1,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 3,
    inProgress: false,
};

const matchWithTeamsSequelize:TSequelizeMatchWithTeams = {
  ...match,
  homeTeam: {dataValues:{
    id: 1,
    teamName: 'Team 1',
  }} as SequelizeTeamModel,
  awayTeam: {dataValues:{
    id: 2,
    teamName: 'Team 2',
  }} as SequelizeTeamModel,
};

const matchWithTeams = {
  ...match,
  homeTeam: {teamName: 'Team 1'},
  awayTeam: {teamName: 'Team 2'},
}

const matches = [match];
const matchesWithTeams = [matchWithTeams];
const matchesWithTeamsSequelize = [matchWithTeamsSequelize];
  
  export {
    match,
    matchWithTeams,
    matchWithTeamsSequelize, 
    matches,
    matchesWithTeams,
    matchesWithTeamsSequelize,
  };