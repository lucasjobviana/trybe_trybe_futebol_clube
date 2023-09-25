import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel';
import { matchesBothTEAM, matchesBothTEAM_Sequelize, matchesFalseTEAM, matchesFalseTEAM_Sequelize,
   matchesTrueTEAM, matchesTrueTEAM_Sequelize, matchTrue } from './mocks/match.mock';
import checkUserAuthentication from '../middlewares/checkUserAuthentication';


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

describe('Integração - Matches - POST', () => {
  before(async () => { 
    sinon
      .stub(SequelizeMatchModel, "create")
      .resolves( matchTrue as SequelizeMatchModel);

      sinon
      .stub(SequelizeMatchModel, "update")
      .resolves(  {} as any);
    sinon.stub(jwt).verify.resolves({id:1});
    
  }); 
 
  after(()=>{
    (SequelizeMatchModel.create as sinon.SinonStub).restore();
    (SequelizeMatchModel.update as sinon.SinonStub).restore();
    (jwt.verify as sinon.SinonStub).restore();
  }) 

  it('Retorna um objeto com status 201 e uma objeto do tipo Match no corpo da resposta.', async function() {
    const {id, inProgress,...matchTRUEPropsInput} = matchTrue; 
    const { status, body } = await chai.request(app).post('/matches').send(matchTRUEPropsInput).auth('token', {type:'bearer'});
    expect(status).to.equal(201);
    expect(body).to.have.property('homeTeamId');
  });

  it('Retorna um objeto com status 422 e uma propriedade message com o valor: It is not possible to create a match with two equal teams no corpo da resposta.', async function() {
    const {id, inProgress, homeTeamId, ...matchTRUEPropsInput} = matchTrue; 
    const { status, body } = await chai.request(app).post('/matches').send({...matchTRUEPropsInput,homeTeamId: matchTRUEPropsInput.awayTeamId}).auth('token', {type:'bearer'});
    expect(status).to.equal(422);
    expect(body).to.have.property('message');
    expect(body.message).to.equal('It is not possible to create a match with two equal teams');
  });

  it('Retorna um objeto com status 404 e uma propriedade message com o valor: There is no team with such id! no corpo da resposta.', async function() {
    const {id, inProgress,homeTeamId, ...matchTRUEPropsInput} = matchTrue; 
    const { status, body } = await chai.request(app).post('/matches').send({...matchTRUEPropsInput,homeTeamId: 0}).auth('token', {type:'bearer'});
    expect(status).to.equal(404);
    expect(body).to.have.property('message');
    expect(body.message).to.equal('There is no team with such id!');
  });

  it('Retorna um objeto com status 404 e uma propriedade message com o valor: All fields must be filled no corpo da resposta.', async function() {
    const {id, inProgress, homeTeamGoals,...matchTRUEPropsInput} = matchTrue; 
    const { status, body } = await chai.request(app).post('/matches').send(matchTRUEPropsInput).auth('token', {type:'bearer'});
    expect(status).to.equal(400);
    expect(body).to.have.property('message');
    expect(body.message).to.equal('All fields must be filled');
  });

  it('Retorna um objeto com status 200 e uma propriedade message no corpo da resposta com o valor: Finished.', async function() {
    const { status, body } = await chai.request(app).patch('/matches/1/finish').send().auth('token', {type:'bearer'});
    expect(status).to.equal(200);
    expect(body).to.have.property('message');
    expect(body.message).to.equal('Finished');
  }); 


  it('Retorna um objeto com status 200 e uma propriedade message no corpo da resposta com o valor: Finished.', async function() {
    const {homeTeamGoals, awayTeamGoals} = matchTrue; 
    const { status, body } = await chai.request(app).patch('/matches/1').send({homeTeamGoals,awayTeamGoals}).auth('token', {type:'bearer'});
    expect(status).to.equal(200);
    expect(body).to.have.property('message');
    expect(body.message).to.equal('Points updated');
  }); 

 
});




