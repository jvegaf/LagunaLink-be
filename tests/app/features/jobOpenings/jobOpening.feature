Feature: Job Opening
  The next Company step after complete a registry is publish a Job Opening.

  Scenario: Publish a Job Opening
    Given I have a Company Role Account
    Given I am logged in with previous created Company Role account
    When I send a POST request with Auth header to "/job_openings" with body:
    """
    {
      "title": "Frontend Developer",
      "position": "Junior Frontend Developer",
      "conditions": "salario 20K anuales",
      "responsibilities": "Desarrollo de interfaz de apliacion web",
      "qualification": "Tecnico Superior en desarrollo de aplicaciones web",
      "prevExperience": "3 meses"
    }
    """
    Then the response status code should be 201

  Scenario: Get an bad request status code when try publish a Job Opening with Student account
    Given I have a Student Role Account
    Given I am logged in with previous created Student Role account
    When I send a POST request with Auth header to "/job_openings" with body:
    """
    {
      "title": "Frontend Developer",
      "position": "Junior Frontend Developer",
      "conditions": "salario 20K anuales",
      "responsibilities": "Desarrollo de interfaz de apliacion web",
      "qualification": "Tecnico Superior en desarrollo de aplicaciones web",
      "prevExperience": "3 meses"
    }
    """
    Then the response status code should be 400

#  Scenario: Upgrade a Job Opening with new data
#    Given I have a Company Role Account
#    Given I am logged in with previous created Company Role account
#    And I published a Job Opening with id "ef8ac118-8d7f-49cc-abec-78e0d05af80a"
#    When I send a PUT request to "/job_openings/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
#    """
#    {
#      "title": "Frontend Developer",
#      "position": "Junior Frontend Developer",
#      "conditions": "salario 25K anuales",
#      "responsibilities": "Desarrollo de interfaz de apliacion web",
#      "qualification": "Tecnico Superior en desarrollo de aplicaciones web",
#      "prevExperience": "3 meses"
#    }
#    """
#    Then the response status code should be 200

  Scenario: Get a not found status code when try update a not exist Job Opening
    Given I have a Company Role Account
    Given I am logged in with previous created Company Role account
    When I send a PUT request to "/job_openings/ef8ac121-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "title": "Frontend Developer",
      "position": "Junior Frontend Developer",
      "conditions": "salario 25K anuales",
      "responsibilities": "Desarrollo de interfaz de apliacion web",
      "qualification": "Tecnico Superior en desarrollo de aplicaciones web",
      "prevExperience": "3 meses"
    }
    """
    Then the response status code should be 404

#  Scenario: Remove a Job Opening
#    Given I have a Company Role Account
#    Given I am logged in with previous created Company Role account
#    And I published a Job Opening with id "ef8ac118-8d7f-49cc-abec-78e0d05af80a"
#
#    When I send a DELETE request to "/job_openings/ef8ac118-8d7f-49cc-abec-78e0d05af80a"
#
#    Then the response status code should be 200
