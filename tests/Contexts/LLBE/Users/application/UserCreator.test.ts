import { UserMother } from '../domain/UserMother';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { CreateUserRequestMother } from './CreateUserRequestMother';
import { UserCreator } from "../../../../../src/Contexts/LLBE/Users/application/UserCreator";

let repository: UserRepositoryMock;
let creator: UserCreator;


beforeEach(() => {
  repository = new UserRepositoryMock();
  creator = new UserCreator(repository);
});

it('should create a valid user', async () => {
  const request = CreateUserRequestMother.random();

  const user = UserMother.fromRequest(request);

  await creator.run(request);

  repository.assertLastSavedUserIs(user);
});
