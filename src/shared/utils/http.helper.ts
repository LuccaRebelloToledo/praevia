import type { ErrorCode } from '@shared/errors/error-codes.enum';

import { ErrorMessages } from '@shared/errors/error-messages';

export interface HttpErrorResponse {
  code: ErrorCode;
  message: string;
}

export const buildHttpErrorResponse = (
  errorCode: ErrorCode,
): HttpErrorResponse => {
  return {
    code: errorCode,
    message: ErrorMessages[errorCode],
  };
};
