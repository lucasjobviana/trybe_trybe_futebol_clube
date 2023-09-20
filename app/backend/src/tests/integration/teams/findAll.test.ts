import * as sinon from 'sinon';
import * as chai from 'chai';
import { team, teams  } from '../../mocks/team.mock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../../app';
import SequelizeTeamModel from '../../../database/models/SequelizeTeamModel';
import { Response } from 'superagent';


chai.use(chaiHttp);
const { expect } = chai;

describe('Integração - Teams - FindAll', () => {
  before(async () => {
    sinon
      .stub(SequelizeTeamModel, "findAll")
      .resolves( teams as SequelizeTeamModel[] );
    
  });

  after(()=>{
    (SequelizeTeamModel.findAll as sinon.SinonStub).restore();
  })

  it('Verifica se uma requisição para a rota /teams retorna um objeto com status 200 e body do tipo SequelizeTeamModel.', async function() {
    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });
 
});
