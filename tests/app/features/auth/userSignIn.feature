Feature: SignIn
  Coverage the different login options

  Scenario: A valid user without account verified
    Given I am a user with account not yet verified
    When I send a POST request to "/auth/signin" with body:
    """
    {
      "email": "ramoncin@gmail.com",
      "password": "123123"
    }
    """
    Then the response status code should be 450
