import {MongoDocument} from '../../../../../Shared/infrastructure/persistence/mongo/MongoDocument';

export type JobOpeningDocument = MongoDocument & {
    name: string;
    description: string;
    address: string;
    postalCode: number;
    region: string;
    city: string;
}
