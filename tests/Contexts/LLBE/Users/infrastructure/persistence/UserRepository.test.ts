import container from '../../../../../../src/app/lagunalink_be/config/dependency-injection';
import { EnvironmentArranger } from '../../../../Shared/infrastructure/arranger/EnvironmentArranger';
import { UserMother } from '../../domain/UserMother';
import { UserRepository } from '../../../../../../src/Contexts/LLBE/Users/domain/UserRepository';

const repository: UserRepository = container.get('App.users.UserRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get(
  'App.EnvironmentArranger'
);

beforeEach(async () => {
  // await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).close();
});

describe('Save user', () => {
  it('should save a user', async () => {
    const user = UserMother.random();

    await repository.save(user);
  });
});

describe('Search User', () => {
  it('should return an existing user', async () => {
    const user = UserMother.random();

    await repository.save(user);

    expect(user).toEqual(await repository.search(user.id));
    expect(user).toEqual(await repository.searchByEmail(user.email));
  });

  it('should not return a non existing user', async () => {
    expect(await repository.search(UserMother.random().id)).toBeFalsy();

    expect(
      await repository.searchByEmail(UserMother.random().email)
    ).toBeFalsy();
  });
});
