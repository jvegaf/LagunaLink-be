import { CompanyRepository } from '../../domain/CompanyRepository';
import { CompanyRequest } from '../CompanyRequest';
import { Company } from '../../domain/Company';
import { CompanyId } from '../../../Shared/domain/Companies/CompanyId';
import { CompanyName } from '../../domain/CompanyName';
import { CompanyDescription } from '../../domain/CompanyDescription';
import { CompanyAddress } from '../../domain/CompanyAddress';
import { CompanyPostalCode } from '../../domain/CompanyPostalCode';
import { CompanyRegion } from '../../domain/CompanyRegion';
import { CompanyCity } from '../../domain/CompanyCity';
import { ApplicationService } from '../../../../Shared/domain/ApplicationService';

export class CompanyUpgrader extends ApplicationService {
  private repository: CompanyRepository;

  constructor(repository: CompanyRepository) {
    super();
    this.repository = repository;
  }

  async run(request: CompanyRequest): Promise<void> {
    const company = Company.create({
      id: new CompanyId(request.id),
      name: new CompanyName(request.name),
      description: new CompanyDescription(request.description),
      address: new CompanyAddress(request.address),
      postalCode: new CompanyPostalCode(request.postalCode),
      region: new CompanyRegion(request.region),
      city: new CompanyCity(request.city)
    });
    await this.repository.save(company);
  }
}
