import { TUserToLogin } from '../../../interfaces/types/IUserToLogin';
import LoginSchema from '../schemas/loginInput.schema';
import AppResponseError from '../../../AppResponseError';

const loginInputValidator = (user:TUserToLogin): void => {
  const { error } = LoginSchema.validate(user);
  if (error) throw new AppResponseError('Invalid email or password');
};

export = loginInputValidator;
