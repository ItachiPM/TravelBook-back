export enum JsonResponseStatus {
  success = 'success',
  failed = 'failed',
}

export interface JsonResponse {
  code: number;
  message: string;
  status: JsonResponseStatus;
  data?;
}
