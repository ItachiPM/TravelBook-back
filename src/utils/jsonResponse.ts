import { JsonResponse } from '../../types';

export const jsonResponse = ({ code, status, message, data }: JsonResponse) => {
  return {
    code,
    status,
    message,
    data: {
      ...data,
    },
  };
};
