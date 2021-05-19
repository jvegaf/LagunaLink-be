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
          'as': 'enrolls.studentDetail'
        }
      }, {
        '$unwind': {
          'path': '$enrolls.studentDetail',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$group': {
          '_id': {
            '_id': '$_id',
            'address': '$address',
            'city': '$city',
            'description': '$description',
            'name': '$name',
            'postalCode': '$postalCode',
            'region': '$region',
            'jobOpenings': {
              '_id': '$jobOpenings._id',
              'conditions': '$jobOpenings.conditions',
              'createdAt': '$jobOpenings.createdAt',
              'position': '$jobOpenings.position',
              'prevExperience': '$jobOpenings.prevExperience',
              'title': '$jobOpenings.title',
              'hiringDate': '$jobOpenings.hiringDate'
            }
          },
          'enrolls': {
            '$push': '$enrolls'
          }
        }
      }, {
        '$group': {
          '_id': '$_id._id',
          'address': {
            '$first': '$_id.address'
          },
          'city': {
            '$first': '$_id.city'
          },
          'description': {
            '$first': '$_id.description'
          },
          'name': {
            '$first': '$_id.name'
          },
          'postalCode': {
            '$first': '$_id.postalCode'
          },
          'region': {
            '$first': '$_id.region'
          },
          'jobOpenings': {
            '$push': {
              '_id': '$_id.jobOpenings._id',
              'conditions': '$_id.jobOpenings.conditions',
              'createdAt': '$_id.jobOpenings.createdAt',
              'position': '$_id.jobOpenings.position',
              'prevExperience': '$_id.jobOpenings.prevExperience',
              'title': '$_id.jobOpenings.title',
              'hiringDate': '$_id.jobOpenings.hiringDate',
              'enrolls': '$enrolls'
            }
          }
        }
      }
    ];

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
