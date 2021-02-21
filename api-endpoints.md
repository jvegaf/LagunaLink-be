## API Implementation Status

### Auth
- [X] POST /auth/signup  { email, password, role }
- [X] POST /auth/signin  { email, password }
- [X] GET /auth/email_verification  token_parameter
- [ ] POST /auth/recover   { email }                         # Recover Password - Generates token and Sends password reset email
- [ ] GET /auth/reset/token=access_token                     # Reset Password - Validate password reset token and shows the password reset view
- [ ] POST /auth/reset { password }                          # change to new password

### Students
- [X] GET /students/{id}                                     # get a student account
- [X] POST /students                                         # register a student account
- [X] PUT /students/{id}                                     # update a student account

### Companies
- [X] GET /companies/{id}                                    # get a company account
- [X] GET /companies/{id}/job_openings                       # get all job openings from a company
- [X] POST /companies # register a company account
- [X] PUT /companies/{id}                                    # update a company account

### Job Openings
- [X] GET /job_openings                                      # get all job openings
- [X] GET /job_openings/{id}                                 # get a job opening
- [X] POST /job_openings                                     # create a job opening
- [X] PUT /job_openings/{id}                                 # update a job opening

### Enrollments
- [X] GET /job_openings/{id}/enrollments                     # get all enrollments of one job opening
- [X] POST /job_openings/{id}/enrollments                    # create a enrollment
- [X] DELETE /job_openings/enrollments/{id}                  # remove a enrollment
