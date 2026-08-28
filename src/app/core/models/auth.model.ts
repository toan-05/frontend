export interface LoginPayload {
  username: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export type UserRole = 'ADMIN' | 'USER';

export interface CurrentUser {
  username: string;
  role: UserRole;
}
