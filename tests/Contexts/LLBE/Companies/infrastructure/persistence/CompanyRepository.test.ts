import container from '../../../../../../src/app/lagunalink_be/config/dependency-injection';
import { EnvironmentArranger } from '../../../../Shared/infrastructure/arranger/EnvironmentArranger';
import {CompanyRepository} from "../../../../../../src/Contexts/LLBE/Companies/domain/CompanyRepository";
import {CompanyMother} from "../../domain/CompanyMother";

const repository: CompanyRepository = container.get('App.companies.CompanyRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get('App.EnvironmentArranger');

beforeEach(async () => {
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).close();
});

describe('Save company', () => {
  it('should save a company', async () => {
    const company = CompanyMother.random();

    await repository.save(company);
  });
});

describe('Search Company', () => {
  it('should return an existing company', async () => {
    const company = CompanyMother.random();

    await repository.save(company);

    expect(company).toEqual(await repository.search(company.id));
  });

  it('should not return a non existing company', async () => {
    expect(await repository.search(CompanyMother.random().id)).toBeFalsy();
  });
});
