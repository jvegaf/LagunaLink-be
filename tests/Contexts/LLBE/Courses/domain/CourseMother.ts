import { CourseId } from '../../../../../src/Contexts/LLBE/Shared/domain/Students/StudentId';
import { StudentName } from '../../../../../src/Contexts/LLBE/Students/domain/StudentName';
import { CourseDuration } from '../../../../../src/Contexts/LLBE/Students/domain/StudentSurname';
import { Student } from '../../../../../src/Contexts/LLBE/Students/domain/Student';
import { CreateCourseRequest } from '../../../../../src/Contexts/LLBE/Students/application/CreateStudentRequest';
import { CourseIdMother } from '../../Shared/domain/Courses/CourseIdMother';
import { CourseNameMother } from './CourseNameMother';
import { CourseDurationMother } from './CourseDurationMother';

export class CourseMother {
  static create(id: CourseId, name: StudentName, duration: CourseDuration): Student {
    return new Student(id, name, duration);
  }

  static fromRequest(request: CreateCourseRequest): Student {
    return this.create(
      CourseIdMother.create(request.id),
      CourseNameMother.create(request.name),
      CourseDurationMother.create(request.duration)
    );
  }

  static random(): Student {
    return this.create(CourseIdMother.random(), CourseNameMother.random(), CourseDurationMother.random());
  }
}
