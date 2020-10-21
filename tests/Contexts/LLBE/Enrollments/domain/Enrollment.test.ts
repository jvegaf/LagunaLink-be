import { EnrollmentRequestMother } from '../application/EnrollmentRequestMother';
import { EnrollmentMother } from './EnrollmentMother';

describe('Enrollment', () => {
  it('should return a new Enrollment instance', () => {
    const request = EnrollmentRequestMother.random();

    const enrollment = EnrollmentMother.fromRequest(request);

    expect(enrollment.id.value).toBe(request.id);
    expect(enrollment.student.value).toBe(request.student);
    expect(enrollment.jobOpening.value).toBe(request.job_opening);
    expect(enrollment.enrollmentDate.toString()).toBe(request.enrollment_date);
  });
});
