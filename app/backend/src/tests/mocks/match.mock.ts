import { Sequelize } from "sequelize";
import { IMatch } from "../../interfaces/IMatch";
import { TSequelizeMatchWithTeams } from "../../interfaces/types/TSequelizeMatchWithTeams";
import SequelizeTeamModel from "../../database/models/SequelizeTeamModel";

const matchFalse:IMatch = {
    id: 1,
    homeTeamId: 1,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 2,
    inProgress: false,
};

const matchTrue:IMatch = {
  id: 2,
  homeTeamId: 2,
  homeTeamGoals: 2,
  awayTeamId: 1,
  awayTeamGoals: 1,
  inProgress: true,
};

const matchFalseTEAM_Sequelize:TSequelizeMatchWithTeams = {
  ...matchFalse,
  homeTeam: {dataValues:{
    id: 1,
    teamName: 'Team 1',
  }} as SequelizeTeamModel,
  awayTeam: {dataValues:{
    id: 2,
    teamName: 'Team 2',
  }} as SequelizeTeamModel,
};

const matchTrueTEAM_Sequelize:TSequelizeMatchWithTeams = {
  ...matchTrue,
  homeTeam: {dataValues:{
    id: 2,
    teamName: 'Team 2',
  }} as SequelizeTeamModel,
  awayTeam: {dataValues:{
    id: 1,
    teamName: 'Team 1',
  }} as SequelizeTeamModel,
};

const matchFalseTEAM = {
  ...matchFalse,
  homeTeam: {teamName: 'Team 1'},
  awayTeam: {teamName: 'Team 2'},
}

const matchTrueTEAM = {
  ...matchTrue,
  homeTeam: {teamName: 'Team 2'},
  awayTeam: {teamName: 'Team 1'},
}
 

const matches = [matchFalse];
const matchesBothTEAM = [matchFalseTEAM,matchTrueTEAM];
const matchesTrueTEAM = [matchTrueTEAM];
const matchesFalseTEAM = [matchFalseTEAM];
const matchesBothTEAM_Sequelize = [matchFalseTEAM_Sequelize,matchTrueTEAM_Sequelize];
const matchesTrueTEAM_Sequelize = [matchTrueTEAM_Sequelize];
const matchesFalseTEAM_Sequelize = [matchFalseTEAM_Sequelize];
//Both, True, False: InProgress
//TEAM: Includes homeTeam and awayTeam objects
//_Sequelize: Objects returned by Sequelize   
  export {
    matchesBothTEAM,
    matchesBothTEAM_Sequelize,
    matchesTrueTEAM,
    matchesTrueTEAM_Sequelize,
    matchesFalseTEAM,
    matchesFalseTEAM_Sequelize,
  };