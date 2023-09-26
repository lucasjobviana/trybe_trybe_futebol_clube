import * as sinon from 'sinon';
import * as chai from 'chai';
import { team, teams, teamsDetailsHome,teamsDetailsAway  } from './mocks/team.mock';
import { matchesFalseTEAM_Sequelize,matchesFalseTEAMAWAY_Sequelize } from './mocks/match.mock';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeamModel from '../database/models/SequelizeTeamModel';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel';

chai.use(chaiHttp);
const { expect } = chai;

describe('Integração - Leaderboard - GET', function() {
  

  it('Verifica se uma requisição para a rota /leaderboard/home retorna um objeto com status 200 e body do tipo ITeamWithMatchesDetails.', async function() {
    sinon
    .stub(SequelizeTeamModel, "findAll")
    .resolves( teams as SequelizeTeamModel[] );
    sinon
      .stub(SequelizeMatchModel, "findAll")
      .resolves( matchesFalseTEAM_Sequelize as any as SequelizeMatchModel[] );
    const { status, body } = await chai.request(app).get('/leaderboard/home');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(teamsDetailsHome);
    (SequelizeTeamModel.findAll as sinon.SinonStub).restore();
    (SequelizeMatchModel.findAll as sinon.SinonStub).restore();
  });

  it('Verifica se uma requisição para a rota /leaderboard/away retorna um objeto com status 200 e body do tipo ITeamWithMatchesDetails.', async function() {
    sinon
      .stub(SequelizeTeamModel, "findAll")
      .resolves( teams as SequelizeTeamModel[] );
    sinon
      .stub(SequelizeMatchModel, "findAll")
      .resolves( matchesFalseTEAMAWAY_Sequelize as any as SequelizeMatchModel[] );
    const { status, body } = await chai.request(app).get('/leaderboard/away');
    expect(status).to.equal(200);
     expect(body).to.deep.equal(teamsDetailsAway);//matchesFalseTEAMAWAY_Sequelize
    (SequelizeTeamModel.findAll as sinon.SinonStub).restore();
    (SequelizeMatchModel.findAll as sinon.SinonStub).restore();
  });

  // it.only('Verifica se uma requisição para a rota /leaderboard/ retorna um objeto com status 200 e body do tipo ITeamWithMatchesDetails.', async function() {
  //   sinon
  //     .stub(SequelizeTeamModel, "findAll")
  //     .resolves( teams as SequelizeTeamModel[] );
  //   sinon
  //     .stub(SequelizeMatchModel, "findAll")
  //     .resolves( matchesFalseTEAMAWAY_Sequelize as any as SequelizeMatchModel[] );
  //   const { status, body } = await chai.request(app).get('/leaderboard');
  //   console.log(body);
  //   expect(status).to.equal(200);
  //   //  expect(body).to.deep.equal(teamsDetailsAway);
  //   (SequelizeTeamModel.findAll as sinon.SinonStub).restore();
  //   (SequelizeMatchModel.findAll as sinon.SinonStub).restore();
  // });

  // it('Verifica se uma requisição para a rota /leaderboard retorna um objeto com status 200 e body do tipo ITeamWithMatchesDetails.', async function() {
  //   const { status, body } = await chai.request(app).get('/leaderboard/');
  //   expect(status).to.equal(200);
  //   expect(body).to.deep.equal(teamsDetails);
  // });
 
});
