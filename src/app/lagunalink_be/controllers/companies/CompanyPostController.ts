import { Request, Response } from 'express';
import { Controller } from '../Controller';
import { AuthJWTChecker } from '../../../../Contexts/LLBE/Users/infrastructure/token/AuthJWTChecker';
import { Token } from '../../../../Contexts/LLBE/Users/domain/Token';
import httpStatus from 'http-status';
import { Payload } from '../../../../Contexts/LLBE/Users/domain/Payload';
import { AuthRole } from '../../../../Contexts/LLBE/Users/domain/AuthRole';
import { CompanyCreator } from '../../../../Contexts/LLBE/Companies/application/CompanyCreator';
import { CompanyRequest } from '../../../../Contexts/LLBE/Companies/application/CompanyRequest';

export class CompanyPostController implements Controller {
  private creator: CompanyCreator;
  private authRoleChecker: AuthRole;

  constructor(companyCreator: CompanyCreator, authRole: AuthRole) {
    this.creator = companyCreator;
    this.authRoleChecker = authRole;
  }

  async run(req: Request, res: Response) {
    if (req.headers.authorization === null) {
      res.status(httpStatus.PAYMENT_REQUIRED).send();
      return;
    }
    const token = new Token(req.headers.authorization as string);
    const authChecker = new AuthJWTChecker();
    let payload: Payload;
    try {
      payload = authChecker.check(token);
    } catch (e) {
      res.status(402).send({ message: e.message });
      return;
    }

    try {
      this.authRoleChecker.check(payload);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }

    const companyRequest: CompanyRequest = {
      id: payload.userId,
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      postalCode: req.body.postalCode,
      region: req.body.region,
      city: req.body.city,
    };

    try {
      await this.creator.run(companyRequest);
    } catch (err) {
      res.status(400).send({ error: 'the company account exists' });
    }

    res.status(201).send();
  }
}
