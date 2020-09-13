import { EventBus } from '../../../../Shared/domain/EventBus';
import { CourseId } from '../../../Shared/domain/Students/StudentId';
import { CoursesCounterRepository } from '../../domain/CoursesCounterRepository';
import { CoursesCounter } from '../../domain/CoursesCounter';
import { CoursesCounterId } from '../../domain/CoursesCounterId';

export class CoursesCounterIncrementer {
  constructor(private repository: CoursesCounterRepository, private bus: EventBus) {}

  async run(courseId: CourseId) {
    const counter = (await this.repository.search()) || this.initializeCounter();

    if (!counter.hasIncremented(courseId)) {
      counter.increment(courseId);

      await this.repository.save(counter);
      this.bus.publish(counter.pullDomainEvents());
    }
  }

  private initializeCounter(): CoursesCounter {
    return CoursesCounter.initialize(CoursesCounterId.random());
  }
}
