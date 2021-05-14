import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { JobOpening } from '../../domain/JobOpening';
import { JobOpeningRepository } from '../../domain/JobOpeningRepository';
import { JobOpeningId } from '../../../Shared/domain/JobOpenings/JobOpeningId';
import { JobOpening as MongoJobOpen, JobOpeningSchema } from './mongo/jobOpening.model';
import { Schema } from 'mongoose';

export class MongoJobOpeningRepository extends MongoRepository<MongoJobOpen> implements JobOpeningRepository {
  protected schema(): Schema {
    return JobOpeningSchema;
  }
  public save(jobOpening: JobOpening): Promise<void> {
    return this.persist(
      jobOpening.id.value, jobOpening);
  }

  public async search(id: JobOpeningId): Promise<Nullable<JobOpening>> {
    const model = await this.model();

    const document = await model.findOne({_id: id.value});

    return document ? JobOpening.fromPrimitives({...document, company: document.company as string , id: document._id}) : null;
  }

  public async remove(id: JobOpeningId): Promise<void> {
    return this.delete(id.value);
  }

  protected moduleName(): string {
    return 'JobOpening';
  }

  public async fetch(): Promise<Array<JobOpening>> {
    const model = await this.model();
    const cursor = await model.find();
    return cursor.map(document => JobOpening.fromPrimitives({...document, company: document.company as string, id: document._id}));
  }

  public async fetchFromCompany(companyId: string): Promise<Array<JobOpening>> {
    const model = await this.model();
    const cursor = await model.find({company: companyId});
    return cursor.map(document => JobOpening.fromPrimitives({...document, company: document.company as string, id: document._id}));
  }
}
