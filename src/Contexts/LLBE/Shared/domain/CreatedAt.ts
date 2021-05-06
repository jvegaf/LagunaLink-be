import { DateValueObject } from '../../../Shared/domain/value-object/DateValueObject';
import { Timestamp } from './Timestamp';

export class CreatedAt extends DateValueObject{

  static now() {
    return new CreatedAt(Timestamp.now());
  }
}
