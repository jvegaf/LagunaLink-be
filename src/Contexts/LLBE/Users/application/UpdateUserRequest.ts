export type UpdateUserRequest = {
  id: string;
  email: string;
  password: string;
  isActive: boolean;
  role: string;
  registered: boolean;
  createdAt: string;
};
