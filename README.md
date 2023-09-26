# [ Trybe Futebol Clube - Lucas Job Viana ] 

Olá, este repósitorio é para armazenar o projeto trybe futebol clube, ultimo projeto de avaliação do módulo Back-End da <a href="https://www.betrybe.com/formacao" target="_blank"><img src="https://theme.zdassets.com/theme_assets/9633455/ecf228e8c15da1a8bd07f574e675a0ac59330968.png" align="center" width="100px"></a>

## Oque é e como funciona ?

O projeto consiste em uma aplicação web full-stack para gerenciamento de partidas de futebol.

Possui três módulos principais, o banco mysql, a api-rest e uma aplicação react (cliente) para exibir e gerênciar as partidas.

Foi desenvolvido para rodar em containers docker. Ao buildar/executar o docker-compose.yml na raiz do projeto, será criado três containers sem nome, utilizando as imagens app_frontend, app_backend e mysql:8.0.32. O banco mysql será criado com o nome TRYBE_FUTEBOL_CLUBE, com usuário root, porta 3306 e senha: 123456 atraves do sequelize do backend.
Ao executar os containers o banco será criado já com algums times, que estão configurados nos asquivos do diretório backend/src/database/seeders/ . Rode o comando npm run db:reset (na raiz do projeto backend) para resetar os valores padrão.
As rotas da api estarão acessiveis atraves de http://localhost/3001 e o frontend atraves de http://localhost:3000/leaderboard.

## Quais tecnologias foram utilizadas ? 

### Back-End
  - Node: [Typescript](https://www.typescriptlang.org/), [Express](https://expressjs.com/pt-br/), [Sequelize](https://sequelize.org/), [JSON Web Token](https://jwt.io/), [Bcrypt](https://www.npmjs.com/package/bcrypt).
  - Paradigma: POO.
  - Testes: [Chai](https://www.chaijs.com/), [Sinon](https://sinonjs.org/) e [Mocha](https://mochajs.org/).
  - Banco de dados: [Mysql](https://www.mysql.com/).
  - [Docker](https://www.docker.com/)

## Tem algum pré-requisito para acessar o projeto ?

- Navegador de internet.
- Docker e docker-compose instalados na máquina.

## Como posso rodar esse projeto na minha máquina ?

    1. Clone ou fork este repositório.
    2. Navegue até o diretório do projeto: `cd sd-030-a-trybe-futebol-clube`.
    3. Na raiz do projeto execute o comando: docker-compose up --build.
    4. Acesse os endpoints da aplicação atraves do endereço `http://localhost:3001/`.
    5. Acesse a aplicação web(cliente) atraves do endereço `http://localhost:3000/`.