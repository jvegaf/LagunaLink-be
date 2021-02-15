Feature: Job Opening
  The next Company step after complete a registry is publish a Job Opening.

  Scenario: Publish a Job Opening
    Given I have a Company Role Account
    And I am logged in the application

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
    And I am logged in the application

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

  Scenario: Upgrade a Job Opening with new data
    Given I have a Company Role Account
    And I am logged in the application
    And I published a Job Opening with id "ef8ac118-8d7f-49cc-abec-78e0d05af80a"

    When I send a PUT request to "/job_openings/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
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
    Then the response status code should be 200

  Scenario: Get a not found status code when try update a not exist Job Opening
    Given I have a Company Role Account
    And I am logged in the application

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

  Scenario: Remove a Job Opening
    Given I have a Company Role Account
    And I am logged in the application
    And I published a Job Opening with id "ef8ac118-8d7f-49cc-abec-78e0d05af80a"

    When I send a DELETE request to "/job_openings/ef8ac118-8d7f-49cc-abec-78e0d05af80a"

    Then the response status code should be 200

  Scenario: Get a Job Opening by Id
    Given Previously was created a Job Opening with id "311d5640-07f8-485e-bf39-6b78a057e4a6"
    And I have a Student Role Account
    And I am logged in the application

    When I send a GET request to "/job_openings/311d5640-07f8-485e-bf39-6b78a057e4a6"

    Then the response status code should be 200

  Scenario: Get all Job Openings
    Given Several Job Openings were previously created
    And I have a Student Role Account
    And I am logged in the application

    When I send a GET request to "/job_openings"

    Then the response status code should be 200

  Scenario: Get all Job Openings from determinated company
    Given Previously was registered a company with id "63252037-4292-46e4-bb5d-27966852f116"
    And This Company published several Job Openings
    And I have a Student Role Account
    And I am logged in the application

    When I send a GET request to "companies/63252037-4292-46e4-bb5d-27966852f116/job_openings"

    Then the response status code should be 200
