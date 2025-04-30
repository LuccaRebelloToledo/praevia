import { ErrorCode } from './error-codes.enum';

export const ErrorMessages: Record<ErrorCode, string> = {
  [ErrorCode.AUTH_INVALID_CREDENTIALS]:
    'The email or password provided is incorrect. Please try again.',
  [ErrorCode.AUTH_USER_INACTIVE]:
    'The user account is inactive. Please contact support for assistance.',
  [ErrorCode.USER_HAS_NO_ROLE_OR_PERMISSIONS]:
    'The user account does not have a valid role or permissions. Please contact support for assistance.',
  [ErrorCode.USER_NOT_FOUND]:
    'The user was not found. Please check the provided information and try again.',
  [ErrorCode.USER_INVALID_EMAIL_OR_ALREADY_EXISTS]:
    'The email provided is either invalid or already exists. Please use a different email address.',
  [ErrorCode.ROLE_NOT_FOUND]:
    'The role was not found. Please check the provided information and try again.',
  [ErrorCode.INTERNAL_SERVER_ERROR]:
    'An internal server error occurred. Please try again later.',
} as const;
