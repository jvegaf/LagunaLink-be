Feature: Enrollments
  The students can enroll to Job Opening.

  Scenario: Enroll to Job Opening
    Given I have a Student Role Account
    Given I am logged in with previous created Student Role account
    And exists a Job Opening with id "96db8670-7ad1-4a91-b917-35decef5c49e"
    When I send a POST request with Auth header to "/job_openings/96db8670-7ad1-4a91-b917-35decef5c49e/enrollments"
    Then the response status code should be 201
