import {UserProfileDTO} from '../../Shared/domain/Users/UserProfileDTO';

export type AuthResponse = {
  status: number;
  user_id: string;
  access_token: string;
  user_role: string;
  profile?: UserProfileDTO;
  email?: string;
  avatar?: string;
};
