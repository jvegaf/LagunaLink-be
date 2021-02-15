import { LanguageLevel } from '../../../../../src/Contexts/LLBE/Students/domain/LanguageLevel';
import { InvalidArgumentError } from '../../../../../src/Contexts/Shared/domain/value-object/InvalidArgumentError';

describe('Language Level', () => {

  it('should throw an InvalidArgumentError when the value is incorrect', () => {
    const EXCESS_VALUE = 7;
    expect(() => {
      LanguageLevel.create(EXCESS_VALUE);
    }).toThrow(InvalidArgumentError);
  });

  it('should create a LanguageLevel instance', function () {
    const LEVEL = 4;
    const langlevel = new LanguageLevel(LEVEL);
    expect(LEVEL).toBe(langlevel.value);
  });
});
