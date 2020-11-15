export class CompanyExists extends Error {

  constructor(message: string) {
    super(message);
    this.name = 'CompanyExists';
  }
}
