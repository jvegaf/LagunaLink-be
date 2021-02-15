import { NumberValueObject } from '../../../Shared/domain/value-object/IntValueObject';
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError';

export class CompanyPostalCode extends NumberValueObject {

    private validatorExp = new RegExp(/^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/);

    constructor(value: number) {
        super(value);
        // this.ensureIsValid(value);
    }

    private ensureIsValid(value: number) {
        if (!(this.validatorExp.test(value.toString()))) {
            throw new InvalidArgumentError(`The Postal Code <${value}> is not valid`);
        }
    }
}
