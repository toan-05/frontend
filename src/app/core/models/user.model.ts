// Khớp BE: Account entity + AccountResponse + Create/UpdateAccountRequest
export type AccountStatus = 'ACTIVE' | 'INACTIVE';
export type AccountRole = 'USER' | 'ADMIN';

export interface Account {
  id: number;
  username: string;
  email: string;
  fullName: string | null;
  status: AccountStatus;
  role: AccountRole;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccountPayload {
  username: string;
  email: string;
  password: string;
  fullName?: string;
  status?: AccountStatus;
  role?: AccountRole;
}

export interface UpdateAccountPayload {
  email?: string;
  fullName?: string;
  status?: AccountStatus;
  role?: AccountRole;
}

export type User = Account;
