import * as sinon from 'sinon';
import * as chai from 'chai';
import { user,userWithCryptPassword  } from './mocks/user.mock';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUserModel from '../database/models/SequelizeUserModel';

chai.use(chaiHttp);
const { expect } = chai; 

describely('Integração - Login - POST', () => {
  before(async () => {
    sinon
      .stub(SequelizeUserModel, "findOne")
      .resolves( {dataValues:userWithCryptPassword} as SequelizeUserModel);
    
  });

  after(()=>{
    (SequelizeUserModel.findOne as sinon.SinonStub).restore();
  })

  it('Retorna um objeto com status 200 e uma propriedade token no corpo da resposta.', async function() {
    const { status, body } = await chai.request(app).post('/login').send(user);
    expect(status).to.equal(200);
    expect(body).to.have.property('token');
  });

  it('Retorna um objeto com status 401 e uma propriedade message no corpo da resposta.', async function() {
    const { status, body } = await chai.request(app).post('/login').send({ email:null, password:null});
    expect(status).to.equal(400);
    expect(body).to.have.property('message');
  });
 
});
