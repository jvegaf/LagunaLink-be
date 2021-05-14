import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { CompanyId } from '../../../Shared/domain/Companies/CompanyId';
import { CompanyRepository } from '../../domain/CompanyRepository';
import { Company as MongoCompany, CompanySchema } from './mongo/company.model';
import { Company } from '../../domain/Company';
import { Schema } from 'mongoose';

export class MongoCompanyRepository extends MongoRepository<MongoCompany> implements CompanyRepository {
  public save(company: Company): Promise<void> {
    return this.persist(
      company.id.value, company);
  }

  public async search(id: CompanyId): Promise<Nullable<Company>> {
    const model = await this.model();

    const document = await model.findOne({ _id: id.value }).exec();

    return document ? Company.fromPrimitives({...document, id: id.value}) : null;
  }

  protected moduleName(): string {
    return 'Company';
  }

  protected schema(): Schema {
    return CompanySchema;
  }

  public async fetch(): Promise<Array<Company>> {
    const model = await this.model();
    const cursor = await model.find();
    return cursor.map(document => Company.fromPrimitives({...document, id: document._id}));
  }

}
