import { CourseCreatedDomainEvent } from '../../../../../src/Contexts/LLBE/Students/domain/CourseCreatedDomainEvent';
import { Student } from '../../../../../src/Contexts/LLBE/Students/domain/Student';

export class CourseCreatedDomainEventMother {
  static create({
    id,
    eventId,
    duration,
    name,
    occurredOn
  }: {
    id: string;
    eventId?: string;
    duration: string;
    name: string;
    occurredOn?: Date;
  }): CourseCreatedDomainEvent {
    return new CourseCreatedDomainEvent({
      id,
      eventId,
      duration,
      name,
      occurredOn
    });
  }

  static fromCourse(course: Student): CourseCreatedDomainEvent {
    return new CourseCreatedDomainEvent({
      id: course.id.value,
      duration: course.duration.value,
      name: course.name.value
    });
  }

}
