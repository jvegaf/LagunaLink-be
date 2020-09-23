import { UserMother } from '../domain/UserMother';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { CreateUserRequestMother } from './CreateUserRequestMother';
import { UserCreator } from "../../../../../src/Contexts/LLBE/Users/application/UserCreator";
import { UserEmailExists } from "../../../../../src/Contexts/LLBE/Users/application/UserEmailExists";

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

it('should throw error when create a user previously registered', async () => {
  const request = CreateUserRequestMother.random();
  const otherRequest = CreateUserRequestMother.random();
  otherRequest.email = request.email;

  await creator.run(request);

  await expect(creator.run(otherRequest)).rejects.toThrow(UserEmailExists);
});


