import { UserProfileDTO } from '../../Shared/domain/Users/UserProfileDTO';

export type AuthResponse = {
  userId: string;
  accessToken: string;
  userRole: string;
  email: string;
  profile?: UserProfileDTO;
  avatar?: string;
};
