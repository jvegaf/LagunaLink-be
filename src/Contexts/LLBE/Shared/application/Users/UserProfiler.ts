import {ApplicationService} from '../../../../Shared/domain/ApplicationService';
import {CompanyRepository} from '../../../Companies/domain/CompanyRepository';
import {StudentRepository} from '../../../Students/domain/StudentRepository';
import {UserProfileRequest} from './UserProfileRequest';
import {UserProfileDTO} from '../../domain/Users/UserProfileDTO';
import {CompanyProfile} from '../../domain/Companies/CompanyProfile';
import {CompanyId} from '../../domain/Companies/CompanyId';
import {StudentId} from '../../domain/Students/StudentId';
import {StudentProfile} from '../../domain/Students/StudentProfile';

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
      const studentProfile = await this.studentRepository.searchProfile(new StudentId(req.userId)) as StudentProfile;
      return studentProfile.toPrimitives();

    case 'ROLE_COMPANY':
      const companyProfile = await this.companyRepository.searchProfile(new CompanyId(req.userId)) as CompanyProfile;
      return companyProfile.toPrimitives();
    }
  }
}
