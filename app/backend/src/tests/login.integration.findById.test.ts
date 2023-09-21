import * as sinon from 'sinon';
import * as chai from 'chai';
import { user  } from './mocks/user.mock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUserModel from '../database/models/SequelizeUserModel';

chai.use(chaiHttp);
const { expect } = chai; 

describe('Integração - Login - POST', () => {
  before(async () => {
    sinon
      .stub(SequelizeUserModel, "findOne")
      .resolves( user as SequelizeUserModel );
    
  });

  after(()=>{
    (SequelizeUserModel.findOne as sinon.SinonStub).restore();
  })

  it('Verifica se uma requisição para a rota /login retorna um objeto com status 200 e um token no corpo da resposta.', async function() {
    const { status, body } = await chai.request(app).post('/login').send(user);
    expect(status).to.equal(200);
    expect(body).to.have.property('token');
  });

  it('Verifica se uma requisição para a rota /login retorna um objeto com status 401 e uma propriedade errorMsg no corpo da resposta.', async function() {
    const { status, body } = await chai.request(app).post('/login').send({ username:null, email:null});
    expect(status).to.equal(401);
    expect(body).to.have.property('errorMsg');
  });
 
});
