Feature: Register a new account
  The first step to do in the platform is registry
  As a new user I want to create a new account

  Scenario: A valid unexisting user
    Given I send a POST request to "/auth/signup" with body:
    """
    {
      "email": "julian-fernandez@gmail.com",
      "password": "123123123",
      "role": "ROLE_STUDENT"
    }
    """
    Then the response status code should be 201
    And the response should be empty
