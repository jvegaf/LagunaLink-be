import { CompanyRepository } from '../../domain/CompanyRepository';
import { CompanyRequest } from '../CompanyRequest';
import { Company } from '../../domain/Company';
import { CompanyId } from '../../../Shared/domain/Companies/CompanyId';
import { CompanyName } from '../../domain/CompanyName';
import { CompanyCity } from '../../domain/CompanyCity';
import { CompanyRegion } from '../../domain/CompanyRegion';
import { CompanyPostalCode } from '../../domain/CompanyPostalCode';
import { CompanyAddress } from '../../domain/CompanyAddress';
import { CompanyDescription } from '../../domain/CompanyDescription';
import { CompanyExists } from '../../domain/CompanyExists';
import { UserUpdateRegistered } from '../../../Users/application/UserUpdateRegistered';
import { UserId } from '../../../Shared/domain/Users/UserId';
import { ApplicationService } from '../../../../Shared/domain/ApplicationService';

export class CompanyCreator extends ApplicationService {
  private repository: CompanyRepository;
  private userUpdateReg: UserUpdateRegistered;

  constructor(repository: CompanyRepository, userUpdateReg: UserUpdateRegistered) {
    super();
    this.userUpdateReg = userUpdateReg;
    this.repository = repository;
  }

  async run(request: CompanyRequest): Promise<void> {
    await this.ensureCompanyNotExists(new CompanyId(request.id));

    const company = Company.create(
      new CompanyId(request.id),
      new CompanyName(request.name),
      new CompanyDescription(request.description),
      new CompanyAddress(request.address),
      new CompanyPostalCode(request.postalCode),
      new CompanyRegion(request.region),
      new CompanyCity(request.city)
    );

    await this.repository.save(company);
    await this.userUpdateReg.run(new UserId(company.id.value));
  }

  private async ensureCompanyNotExists(id: CompanyId) {
    if ((await this.repository.search(id)) !== null) {
      throw new CompanyExists('the company account exists');
    }
  }
}
