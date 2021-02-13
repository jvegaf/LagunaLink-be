
import { CreateCompanyRequestMother } from '../application/Create/CreateCompanyRequestMother';
import { CompanyMother } from './CompanyMother';

describe('Company', () => {

  it('should return a new company instance', () => {
    const request = CreateCompanyRequestMother.random();

    const company = CompanyMother.fromRequest(request);

    expect(company.id.value).toBe(request.id);
    expect(company.name.value).toBe(request.name);
    expect(company.description.value).toBe(request.description);
    expect(company.address.value).toBe(request.address);
    expect(company.region.value).toBe(request.region);
    expect(company.city.value).toBe(request.city);
  });
});
