Feature: Student Registry
  The next step after of create a new account is complete
  the registry of a student account.

  Scenario: Register a Student account
    Given I am logged in with previous created Student Role account
    When I send a POST request with Auth header to "/students" with body:
    """
    {
      "name": "Juan",
      "surname": "Lopez",
      "lastname": "Fernandez"
    }
    """
    Then the response status code should be 201

  Scenario: Get an bad request error when try register a Student with Company account
    Given I am logged in with previous created Company Role account
    When I send a POST request with Auth header to "/students" with body:
    """
    {
      "name": "Juan",
      "surname": "Lopez",
      "lastname": "Fernandez"
    }
    """
    Then the response status code should be 400

  Scenario: Get an bad request error when try register a Student previously registered
    Given I am logged in with a Student Role account previously registered
    When I send a POST request with Auth header to "/students" with body:
    """
    {
      "name": "Juan",
      "surname": "Lopez",
      "lastname": "Fernandez"
    }
    """
    Then the response status code should be 400
