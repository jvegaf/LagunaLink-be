import { UserRole } from '../../../Contexts/LLBE/Users/domain/UserRole';

export const ROLE_STUDENT = () => {
  return new UserRole('STUDENT_ROLE');
};

export const ROLE_COMPANY = () => {
  return new UserRole('COMPANY_ROLE');
};
