import { ApplicationService } from '../../../../Shared/domain/ApplicationService';
import { CompanyCreator } from '../../../Companies/application/Create/CompanyCreator';
import { StudentCreator } from '../../../Students/application/Create/StudentCreator';
import { UserId } from '../../domain/Users/UserId';
import { UserRole } from '../../../Users/domain/UserRole';

export class RoleAccountCreator extends ApplicationService {
  private studentCreator: StudentCreator;
  private companyCreator: CompanyCreator;

  constructor(studentCreator: StudentCreator, companyCreator: CompanyCreator) {
    super();
    this.studentCreator = studentCreator;
    this.companyCreator = companyCreator;
  }

  async run(userId: UserId, role: UserRole): Promise<void> {
    if (role.value === 'ROLE_STUDENT') {
      return await this.studentCreator.run(userId.value);
    }
    await this.companyCreator.run(userId.value);
  }
}
