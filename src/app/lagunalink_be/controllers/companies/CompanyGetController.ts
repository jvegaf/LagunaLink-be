import {Request, Response} from 'express';
import {Controller} from '../Controller';
import {CompanyFinder} from '../../../../Contexts/LLBE/Companies/application/Find/CompanyFinder';

export class CompanyGetController implements Controller {
  private finder: CompanyFinder;

  constructor(companyFinder: CompanyFinder) {
    this.finder = companyFinder;
  }

  async run(req: Request, res: Response) {

    try {
      const company = await this.finder.run(req.params.id);

      res.status(200).send({company});
    }
    catch (e) {
      res.status(404).send({message: e.message});
    }
  }
}
