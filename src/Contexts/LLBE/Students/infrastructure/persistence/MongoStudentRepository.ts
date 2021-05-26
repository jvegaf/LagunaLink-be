import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { StudentId } from '../../../Shared/domain/Students/StudentId';
import { Student } from '../../domain/Student';
import { StudentRepository } from '../../domain/StudentRepository';
import { UpgradeStudentRequest } from '../../application/Update/UpgradeStudentRequest';
import { StudentProfileDTO } from '../../../Shared/domain/Students/StudentProfileDTO';

export class MongoStudentRepository extends MongoRepository<Student> implements StudentRepository {
  public save(student: Student): Promise<void> {
    return this.persist(
      student.id.value, student);
  }

  public async search(id: StudentId): Promise<Nullable<Student>> {
    const collection = await this.collection();

    const document = await collection.findOne({_id: id.value});

    return document ? Student.fromPrimitives({...document, id: id.value}) : null;
  }

  public async searchProfile(id: StudentId): Promise<StudentProfileDTO> {
    const collection = await this.collection();

    const agg = [
      {
        '$match': {
          '_id': id.value
        }
      }, {
        '$lookup': {
          'from': 'enrollments',
          'localField': '_id',
          'foreignField': 'student',
          'as': 'enrolls'
        }
      }, {
        '$unwind': {
          'path': '$enrolls',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$lookup': {
          'from': 'jobOpenings',
          'localField': 'enrolls.job_opening',
          'foreignField': '_id',
          'as': 'jobOpenings'
        }
      }, {
        '$unwind': {
          'path': '$jobOpenings',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$group': {
          '_id': '$_id',
          'name': {
            '$first': '$name'
          },
          'surname': {
            '$first': '$surname'
          },
          'lastname': {
            '$first': '$lastname'
          },
          'qualification': {
            '$first': '$qualification'
          },
          'languages': {
            '$first': '$languages'
          },
          'job_experiences': {
            '$first': '$job_experiences'
          },
          'enrolls': {
            '$push': '$enrolls'
          },
          'jobOpenings': {
            '$push': '$jobOpenings'
          }
        }
      }
    ];

    const docArr = await collection.aggregate(agg).toArray();
    const document = docArr[0];

    return {...document, id: id.value};
  }

  public async update(values: UpgradeStudentRequest): Promise<void> {
    const collection = await this.collection();
    collection.findOneAndUpdate(
      {_id: values.id},
      {$set: values}
    );
  }

  protected moduleName(): string {
    return 'students';
  }
}
