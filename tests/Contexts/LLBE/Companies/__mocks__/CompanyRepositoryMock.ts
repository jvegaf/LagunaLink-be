import { CompanyRepository } from '../../../../../src/Contexts/LLBE/Companies/domain/CompanyRepository';
import { Nullable } from '../../../../../src/Contexts/Shared/domain/Nullable';
import { Company } from '../../../../../src/Contexts/LLBE/Companies/domain/Company';
import { CompanyId } from '../../../../../src/Contexts/LLBE/Shared/domain/Companies/CompanyId';

export class CompanyRepositoryMock implements CompanyRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();
  private mockFetch = jest.fn();

  async save(company: Company): Promise<void> {
    this.mockSave(company);
  }

  assertLastSavedCompanyIs(expected: Company): void {
    const mock = this.mockSave.mock;
    const lastSavedCompany = mock.calls[mock.calls.length - 1][0] as Company;
    expect(lastSavedCompany).toBeInstanceOf(Company);
    expect(lastSavedCompany.name).toEqual(expected.name);
    expect(lastSavedCompany.description).toEqual(expected.description);
    expect(lastSavedCompany.postalCode).toEqual(expected.postalCode);
  }

  async search(id: CompanyId): Promise<Nullable<Company>> {
    return this.mockSearch(id);
  }

  whenSearchThenReturn(value: Nullable<Company>): void {
    this.mockSearch.mockReturnValue(value);
  }

  assertLastSearchedCompanyIs(expected: CompanyId): void {
    expect(this.mockSearch).toHaveBeenCalledWith(expected);
  }

  fetch(): Promise<Array<Company>> {
    return this.mockFetch();
  }
}
