import * as sinon from 'sinon';
import * as chai from 'chai';
import { user, users  } from './mocks/user.mock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUserModel from '../database/models/SequelizeUserModel';


chai.use(chaiHttp);
const { expect } = chai;

describe('Integração - Users - FindAll', function() {
  before(async () => {
    sinon
      .stub(SequelizeUserModel, "findAll")
      .resolves( users as unknown as SequelizeUserModel[]);
    
  });

  after(()=>{
    (SequelizeUserModel.findAll as sinon.SinonStub).restore();
  })

  it('Verifica se uma requisição para a rota /users retorna um objeto com status 200 e body do tipo SequelizeUserModel.', async function() {
    const { status, body } = await chai.request(app).get('/users');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(users);
  });
 
});
