import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { CompanyId } from '../../../Shared/domain/Companies/CompanyId';
import { Company } from '../../domain/Company';
import { CompanyRepository } from '../../domain/CompanyRepository';
import { CompanyProfile } from '../../../Shared/domain/Companies/CompanyProfile';

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

  public async searchProfile(id: CompanyId): Promise<Nullable<Company>> {
    const collection = await this.collection();
    const agg = [
      {
        '$lookup': {
          'from': 'jobOpenings',
          'localField': '_id',
          'foreignField': 'company',
          'as': 'jobOpenings'
        }
      },
      {
        '$unwind': '$jobOpenings'
      },
      {
        '$lookup': {
          'from': 'enrollments',
          'localField': 'jobOpenings._id',
          'foreignField': 'jobOpening',
          'as': 'enrollments'
        }
      },
      {
        '$unwind': '$enrollments'
      },
      {
        '$lookup': {
          'from': 'students',
          'localField': 'enrollments.student',
          'foreignField': '_id',
          'as': 'studentDetail'
        }
      },
      {
        '$match': {
          '_id': id.value
        }
      }
    ];

    // position.aggregate([
    //   { "$lookup": {
    //       "from": "companies",
    //       "localField": "company_id",
    //       "foreignField": "_id",
    //       "as": "companies"
    //     }},
    //   { "$unwind": "$companies" },
    //   { "$lookup": {
    //       "from": "industries",
    //       "localField": "companies.industry_id",
    //       "foreignField": "_id",
    //       "as": "companies.industry"
    //     }},
    //   { "$unwind": "$companies.industry" },
    //   { "$group": {
    //       "_id": "$_id",
    //       "companies": { "$push": "$companies" }
    //     }}
    // ])

    const docArr = await collection.aggregate(agg).toArray();
    const document = docArr[0];
    return document ? CompanyProfile.fromPrimitives({...document, id: id.value}) : null;
  }

  public async fetch(): Promise<Array<Company>> {
    const collection = await this.collection();
    const resultSet: Company[] = [];
    const cursor = collection.find();
    await cursor.forEach(document => {
      resultSet.push(Company.fromPrimitives({...document, id: document._id}));
    });

    return resultSet;
  }

  protected moduleName(): string {
    return 'companies';
  }
}
