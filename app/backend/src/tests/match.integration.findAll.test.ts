import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel';
import { matchesBothTEAM, matchesBothTEAM_Sequelize, matchesFalseTEAM, matchesFalseTEAM_Sequelize, matchesTrueTEAM, matchesTrueTEAM_Sequelize } from './mocks/match.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Integração - Matches - GET', () => {

  it('Retorna um objeto com status 200 e um objeto do tipo Match[].', async function() {
    sinon
    .stub(SequelizeMatchModel, "findAll")
    .resolves( matchesBothTEAM_Sequelize as any);
    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesBothTEAM);
    (SequelizeMatchModel.findAll as sinon.SinonStub).restore();
  });

  it('Retorna um objeto com status 200 e um objeto do tipo Match[] com inProgress=true.', async function() {
    sinon
    .stub(SequelizeMatchModel, "findAll")
    .resolves( matchesTrueTEAM_Sequelize as any);
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesTrueTEAM);
    (SequelizeMatchModel.findAll as sinon.SinonStub).restore();
  });

  it('Retorna um objeto com status 200 e um objeto do tipo Match[] com inProgress=false.', async function() {
    sinon
    .stub(SequelizeMatchModel, "findAll")
    .resolves( matchesFalseTEAM_Sequelize as any);
    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesFalseTEAM);
    (SequelizeMatchModel.findAll as sinon.SinonStub).restore();
  });
 
});


