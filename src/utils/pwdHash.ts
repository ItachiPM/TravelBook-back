import * as crypto from 'crypto';
import { config } from '../../config/config';

export const pwdHash = (password: string) => {
  const hmac = crypto.createHmac('sha512', config.salt);
  hmac.update(password);
  return hmac.digest('hex');
};
