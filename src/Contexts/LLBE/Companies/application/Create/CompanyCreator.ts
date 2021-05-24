import { CompanyRepository } from '../../domain/CompanyRepository';
import { Company } from '../../domain/Company';
import { CompanyId } from '../../../Shared/domain/Companies/CompanyId';
import { CompanyName } from '../../domain/CompanyName';
import { CompanyCity } from '../../domain/CompanyCity';
import { CompanyRegion } from '../../domain/CompanyRegion';
import { CompanyPostalCode } from '../../domain/CompanyPostalCode';
import { CompanyAddress } from '../../domain/CompanyAddress';
import { CompanyDescription } from '../../domain/CompanyDescription';
import { CompanyExists } from '../../domain/CompanyExists';
import { ApplicationService } from '../../../../Shared/domain/ApplicationService';

export class CompanyCreator extends ApplicationService {
  private repository: CompanyRepository;

  constructor(repository: CompanyRepository) {
    super();
    this.repository = repository;
  }

  async run(userId: string): Promise<void> {
    await this.ensureCompanyNotExists(new CompanyId(userId));

    const company = Company.create({
      id: new CompanyId(userId),
      name: new CompanyName(),
      description: new CompanyDescription(),
      address: new CompanyAddress(),
      postalCode: new CompanyPostalCode(),
      region: new CompanyRegion(),
      city: new CompanyCity()
    });

    await this.repository.save(company);
  }

  private async ensureCompanyNotExists(id: CompanyId) {
    if ((await this.repository.search(id)) !== null) {
      throw new CompanyExists('the company account exists');
    }
  }
}
