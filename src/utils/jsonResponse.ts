import { JsonResponse } from '../types/jsonResponse/jsonResponse';

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
