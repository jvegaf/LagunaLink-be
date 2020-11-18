import { DomainEvent } from './DomainEvent';
import Logger from './Logger';
import WinstonLogger from '../infrastructure/WinstonLogger';

export abstract class ApplicationService {
  private logger: Logger;

  constructor() {
    this.logger = new WinstonLogger();
  }

  logDebug(message: string): void {
    this.logger.debug(message);
  }

  logError(message: string): void {
    this.logger.error(message);
  }

  logInfo(message: string): void {
    this.logger.info(message);
  }
}
