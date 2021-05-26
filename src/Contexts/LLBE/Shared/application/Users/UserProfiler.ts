import { ApplicationService } from '../../../../Shared/domain/ApplicationService';
import { CompanyRepository } from '../../../Companies/domain/CompanyRepository';
import { StudentRepository } from '../../../Students/domain/StudentRepository';
import { UserProfileRequest } from './UserProfileRequest';
import { UserProfileDTO } from '../../domain/Users/UserProfileDTO';
import { CompanyId } from '../../domain/Companies/CompanyId';
import { StudentId } from '../../domain/Students/StudentId';

export class UserProfiler extends ApplicationService {
  private studentRepository: StudentRepository;
  private companyRepository: CompanyRepository;

  constructor(studentRepository: StudentRepository, companyRepository: CompanyRepository) {
    super();
    this.studentRepository = studentRepository;
    this.companyRepository = companyRepository;
  }

  // @ts-ignore
  async run(req: UserProfileRequest): Promise<UserProfileDTO> {
    switch (req.role) {
    case 'ROLE_STUDENT':
      return await this.studentRepository.searchProfile(new StudentId(req.userId));

    case 'ROLE_COMPANY':
      return await this.companyRepository.searchProfile(new CompanyId(req.userId));
    }
  }
}
