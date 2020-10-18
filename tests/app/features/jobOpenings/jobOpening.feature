Feature: Job Opening
  The next Company step after complete a registry is publish a Job Opening.

  Scenario: Publish a Job Opening
    Given I am logged in with previous created Company Role account
    When I send a POST request with Auth header to "/job_opening" with body:
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

  Scenario: Get an bad request error when try publish a Job Opening with Student account
    Given I am logged in with previous created Student Role account
    When I send a POST request with Auth header to "/job_opening" with body:
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
    Given I am logged in with previous created Company Role account
    When I send a PUT request with Auth header to "/companies" with body:
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
