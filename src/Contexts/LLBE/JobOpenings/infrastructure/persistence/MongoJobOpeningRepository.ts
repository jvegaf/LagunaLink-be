import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { JobOpening } from '../../domain/JobOpening';
import { JobOpeningRepository } from '../../domain/JobOpeningRepository';
import { JobOpeningId } from '../../../Shared/domain/JobOpenings/JobOpeningId';

export class MongoJobOpeningRepository extends MongoRepository<JobOpening> implements JobOpeningRepository {
    public save(jobOpening: JobOpening): Promise<void> {
        return this.persist(
          jobOpening.id.value, jobOpening);
    }

    public async search(id: JobOpeningId): Promise<Nullable<JobOpening>> {
        const collection = await this.collection();

        const document = await collection.findOne({_id: id.value});

        return document ? JobOpening.fromPrimitives({...document, id: id.value}) : null;
    }

    public async remove(id: JobOpeningId): Promise<void> {
        return this.delete(id.value);
    }

    protected moduleName(): string {
        return 'jobOpenings';
    }

    public async fetch(): Promise<Array<JobOpening>> {
        const collection = await this.collection();
        const resultSet: JobOpening[] = [];
        const cursor = collection.find();
        await cursor.forEach(document => {
            resultSet.push(JobOpening.fromPrimitives({...document, id: document._id}));
        });

        return resultSet;
    }
}
