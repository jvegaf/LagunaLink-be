import { UserProfileDTO } from '../Users/UserProfileDTO';

export type CompanyDTO = UserProfileDTO & {
  name: string;
  description: string;
  address: string;
  postalCode: number;
  region: string;
  city: string;
};
