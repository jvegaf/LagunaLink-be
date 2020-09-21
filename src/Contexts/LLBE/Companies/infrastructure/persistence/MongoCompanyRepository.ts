import {Nullable} from '../../../../Shared/domain/Nullable';
import {MongoRepository} from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import {CompanyId} from '../../../Shared/domain/Companies/CompanyId';
import {Company} from '../../domain/Company';
import {CompanyRepository} from "../../domain/CompanyRepository";

export class MongoCompanyRepository extends MongoRepository<Company> implements CompanyRepository {
    public save(company: Company): Promise<void> {
        return this.persist(
            company.id.value, company);
    }

    public async search(id: CompanyId): Promise<Nullable<Company>> {
        const collection = await this.collection();

        const document = await collection.findOne({_id: id.value});

        return document ? Company.fromPrimitives({...document, id: id.value}) : null;
    }

    protected moduleName(): string {
        return 'companies';
    }
}
