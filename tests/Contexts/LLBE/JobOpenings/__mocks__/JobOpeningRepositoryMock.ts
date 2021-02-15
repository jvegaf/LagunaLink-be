import { JobOpening } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpening';
import { JobOpeningId } from '../../../../../src/Contexts/LLBE/Shared/domain/JobOpenings/JobOpeningId';
import { Nullable } from '../../../../../src/Contexts/Shared/domain/Nullable';
import { JobOpeningRepository } from '../../../../../src/Contexts/LLBE/JobOpenings/domain/JobOpeningRepository';

export class JobOpeningRepositoryMock implements JobOpeningRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();
  private mockFetch = jest.fn();
  private mockCompanyFetch = jest.fn();

  async save(jobOpening: JobOpening): Promise<void> {
    this.mockSave(jobOpening);
  }

  assertLastSavedJobOpeningIs(expected: JobOpening): void {
    const mock = this.mockSave.mock;
    const lastSavedJobOpening = mock.calls[mock.calls.length - 1][0] as JobOpening;
    expect(lastSavedJobOpening).toBeInstanceOf(JobOpening);
    expect(lastSavedJobOpening.company).toEqual(expected.company);
    expect(lastSavedJobOpening.title).toEqual(expected.title);
    expect(lastSavedJobOpening.position).toEqual(expected.position);
  }

  async search(id: JobOpeningId): Promise<Nullable<JobOpening>> {
    return this.mockSearch(id);
  }

  whenSearchThenReturn(value: Nullable<JobOpening>): void {
    this.mockSearch.mockReturnValue(value);
  }

  whenFetchThenReturn(value: Array<JobOpening>): void {
    this.mockFetch.mockReturnValue(value);
  }

  whenFetchFromCompanyThenReturn(value: Array<JobOpening>): void {
    this.mockCompanyFetch.mockReturnValue(value);
  }

  assertLastSearchedJobOpeningIs(expected: JobOpeningId): void {
    expect(this.mockSearch).toHaveBeenCalledWith(expected);
  }

  remove(id: JobOpeningId): Promise<void> {
    return Promise.resolve(undefined);
  }

  fetch(): Promise<Array<JobOpening>> {
    return this.mockFetch();
  }

  fetchFromCompany(companyId: string): Promise<Array<JobOpening>> {
    return this.mockCompanyFetch();
  }
}
