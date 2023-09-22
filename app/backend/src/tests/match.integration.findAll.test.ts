import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { matchesWithTeams, matchesWithTeamsSequelize  } from './mocks/match.mock';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel';


chai.use(chaiHttp);

const { expect } = chai;

describe('Integração - Matches - GET', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(SequelizeMatchModel, "findAll")
      .resolves( matchesWithTeamsSequelize as any);
    
  });

  after(()=>{
    (SequelizeMatchModel.findAll as sinon.SinonStub).restore();
  })

  it('Retorna um objeto com status 200 e um objeto do tipo SequelizeMatchModel.', async function() {
    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesWithTeams);
  });
 
});
