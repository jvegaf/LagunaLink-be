import { CreateCourseRequest } from '../../../../../src/Contexts/LLBE/Students/application/CreateStudentRequest';
import { CourseDuration } from '../../../../../src/Contexts/LLBE/Students/domain/StudentSurname';
import { CourseId } from '../../../../../src/Contexts/LLBE/Shared/domain/Students/StudentId';
import { StudentName } from '../../../../../src/Contexts/LLBE/Students/domain/StudentName';
import { CourseDurationMother } from '../domain/CourseDurationMother';
import { CourseIdMother } from '../../Shared/domain/Courses/CourseIdMother';
import { CourseNameMother } from '../domain/CourseNameMother';

export class CreateCourseRequestMother {
  static create(id: CourseId, name: StudentName, duration: CourseDuration): CreateCourseRequest {
    return { id: id.value, name: name.value, duration: duration.value };
  }

  static random(): CreateCourseRequest {
    return this.create(CourseIdMother.random(), CourseNameMother.random(), CourseDurationMother.random());
  }
}
