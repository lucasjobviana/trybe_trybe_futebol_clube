import * as sinon from 'sinon';
import * as chai from 'chai';
import { match, matches  } from './mocks/match.mock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Integração - Matches - GET', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(SequelizeMatchModel, "findAll")
      .resolves( matches as SequelizeMatchModel[] );
    
  });

  after(()=>{
    (SequelizeMatchModel.findAll as sinon.SinonStub).restore();
  })

  it('Verifica se uma requisição para a rota /matches retorna um objeto com status 200 e body do tipo SequelizeMatchModel.', async function() {
    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });
 
});
