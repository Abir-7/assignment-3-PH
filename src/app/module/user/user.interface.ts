export interface T_User {
  name: string;
  email: string;
  password: string; // Must be hashed
  phone: string;
  role: 'admin' | 'user';
  address: string;
}

export type T_UserRole = 'admin' | 'user';
