import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { CourseCreatedDomainEvent } from '../../../Students/domain/CourseCreatedDomainEvent';
import { CourseId } from '../../../Shared/domain/Students/StudentId';
import { CoursesCounterIncrementer } from './CoursesCounterIncrementer';

export class IncrementCoursesCounterOnCourseCreated implements DomainEventSubscriber<CourseCreatedDomainEvent> {
  constructor(private incrementer: CoursesCounterIncrementer) {}

  subscribedTo(): DomainEventClass[] {
    return [CourseCreatedDomainEvent];
  }

  async on(domainEvent: CourseCreatedDomainEvent) {
    await this.incrementer.run(new CourseId(domainEvent.aggregateId));
  }
}
