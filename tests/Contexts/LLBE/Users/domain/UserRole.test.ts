import { UserRole } from '../../../../../src/Contexts/LLBE/Users/domain/UserRole';
import { InvalidArgumentError } from '../../../../../src/Contexts/Shared/domain/value-object/InvalidArgumentError';

describe('User Roles', () => {

  it('should throw an InvalidArgument error with not valid role', () => {
    const FAKE_ROLE = 'ROLE_FAKER';

    expect(() => {
      UserRole.create(FAKE_ROLE);
    }).toThrow(InvalidArgumentError);
  });

  it('should can create a Student Role', () => {
    const ROLE_VALUE = 'ROLE_STUDENT';

    const role = UserRole.create(ROLE_VALUE);

    expect(ROLE_VALUE).toBe(role.value);
  });

  it('should can create a Company Role', () => {
    const ROLE_VALUE = 'ROLE_COMPANY';

    const role = UserRole.create(ROLE_VALUE);

    expect(ROLE_VALUE).toBe(role.value);
  });
});
