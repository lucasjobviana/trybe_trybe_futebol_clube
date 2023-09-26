import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import * as cors from 'cors';
import userRouter from './routes/user.routes';
import teamRouter from './routes/team.routes';
import matchRouter from './routes/match.routes';
import loginRouter from './routes/login.routes';
import leaderBoardRouter from './routes/leaderBoard.routes';
import AppResponseError from './AppResponseError';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.routes();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.use((err:AppResponseError | Error, _req:Request, res: Response, _n:NextFunction) => {
      if (err instanceof AppResponseError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      return res.status(500).json({ message: 'Erro não tratado.', messageError: err.message });
    });
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
  }

  private routes(): void {
    this.app.use('/users', userRouter);
    this.app.use('/teams', teamRouter);
    this.app.use('/matches', matchRouter);
    this.app.use('/login', loginRouter);
    this.app.use('/leaderboard', leaderBoardRouter);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
