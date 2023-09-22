import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import APPResponseError from '../AppResponseError';

const checkUserAuthentication = (req: Request, res: Response, next: NextFunction):void => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new APPResponseError('Token not found');
  }
  const token = authorization.split(' ')[1];

  try {
    const user = jwt.verify(token, 'calafjksaoiekalladioadj');
    req.body.user = user;
  } catch (error) {
    throw new APPResponseError('Token must be a valid token');
  }
  next();
};
export default checkUserAuthentication;
