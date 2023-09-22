import * as jwt from 'jsonwebtoken';
import { TUserToLogin } from './interfaces/types/TUserToLogin';

const getNewToken = (user: TUserToLogin): string => {
  const token = jwt.sign({ data: user }, 'calafjksaoiekalladioadj', {
    algorithm: 'HS256',
    expiresIn: '1d',
  });
  return token;
};

export default getNewToken;
