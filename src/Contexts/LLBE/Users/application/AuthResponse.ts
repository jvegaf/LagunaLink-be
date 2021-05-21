import {UserProfileDTO} from '../../Shared/domain/Users/UserProfileDTO';

export type AuthResponse = {
  status: number;
  userId: string;
  accessToken: string;
  userRole: string;
  profile?: UserProfileDTO;
  email?: string;
  avatar?: string;
};
