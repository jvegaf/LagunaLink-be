import { Controller } from '../Controller';
import { Request, Response } from 'express';
import { CompanyFetcher } from '../../../../Contexts/LLBE/Companies/application/Fetch/CompanyFetcher';

export class CompanyFetchController implements Controller {
  private fetcher: CompanyFetcher;

  constructor(companyFetcher: CompanyFetcher) {
    this.fetcher = companyFetcher;
  }

  async run(req: Request, res: Response) {
    const companies = await this.fetcher.run();
    const primitiveCompanies = companies.map(company => company.toPrimitives());
    res.status(200).send({ companies: primitiveCompanies });
  }
}
