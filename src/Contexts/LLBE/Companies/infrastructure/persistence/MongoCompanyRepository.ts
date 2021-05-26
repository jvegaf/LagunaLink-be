import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { CompanyId } from '../../../Shared/domain/Companies/CompanyId';
import { Company } from '../../domain/Company';
import { CompanyRepository } from '../../domain/CompanyRepository';
import { CompanyProfileDTO } from '../../../Shared/domain/Companies/CompanyProfileDTO';

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

  public async searchProfile(id: CompanyId): Promise<CompanyProfileDTO> {
    const collection = await this.collection();
    const agg = [
      {
        '$match': {
          '_id': id.value
        }
      }, {
        '$lookup': {
          'from': 'jobOpenings',
          'localField': '_id',
          'foreignField': 'company',
          'as': 'jobOpenings'
        }
      }, {
        '$unwind': {
          'path': '$jobOpenings',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$lookup': {
          'from': 'enrollments',
          'localField': 'jobOpenings._id',
          'foreignField': 'job_opening',
          'as': 'enrolls'
        }
      }, {
        '$unwind': {
          'path': '$enrolls',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$lookup': {
          'from': 'students',
          'localField': 'enrolls.student',
          'foreignField': '_id',
          'as': 'studentDetail'
        }
      }, {
        '$unwind': {
          'path': '$studentDetail',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$group': {
          '_id': '$_id',
          'address': {
            '$first': '$address'
          },
          'city': {
            '$first': '$city'
          },
          'description': {
            '$first': '$description'
          },
          'name': {
            '$first': '$name'
          },
          'postalCode': {
            '$first': '$postalCode'
          },
          'region': {
            '$first': '$region'
          },
          'jobOpenings': {
            '$push': '$jobOpenings'
          },
          'enrolls': {
            '$push': '$enrolls'
          },
          'students': {
            '$push': '$studentDetail'
          }
        }
      }
    ];

    const docArr = await collection.aggregate(agg).toArray();
    const document = docArr[0];
    return {...document, id: id.value};
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
