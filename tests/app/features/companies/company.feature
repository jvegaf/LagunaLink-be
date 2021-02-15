Feature: Company Registry
  The next step after of create a new account is complete
  the registry of a company account.

  Scenario: Register a Company account
    Given I have a Company Role Account without complete register
    And I am logged in the application
    When I send a POST request with Auth header to "/companies" with body:
    """
    {
      "name": "La sureña",
      "description": "Somos uno de los bares mas concurridos del mundo",
      "address": "Sal si puedes 8",
      "postalCode": 45001,
      "region": "Madrid",
      "city": "Madrid"
    }
    """
    Then the response status code should be 201

  Scenario: Get an bad request error when try register a Company with Student account
    Given I have a Student Role Account
    And I am logged in the application

    When I send a POST request with Auth header to "/companies" with body:
    """
    {
      "name": "La sureña",
      "description": "Somos uno de los bares mas concurridos del mundo",
      "address": "Sal si puedes 8",
      "postalCode": 45001,
      "region": "Madrid",
      "city": "Madrid"
    }
    """
    Then the response status code should be 400

  Scenario: Get an bad request error when try register a Company previously registered
    Given I have a Company Role Account
    And I am logged in the application

    When I send a POST request with Auth header to "/companies" with body:
    """
    {
      "name": "La sureña",
      "description": "Somos uno de los bares mas concurridos del mundo",
      "address": "Sal si puedes 8",
      "postalCode": 45001,
      "region": "Madrid",
      "city": "Madrid"
    }
    """
    Then the response status code should be 400

  Scenario: Upgrade a company with new data
    Given I have a Company Role Account
    And I am logged in the application

    When I send a PUT request with Auth header to "/companies" with body:
    """
    {
      "name": "La Sureña",
      "description": "Somos el bar mas concurrido del mundo",
      "address": "Sal si puedes, 8",
      "postalCode": 45001,
      "region": "Madrid",
      "city": "Madrid"
    }
    """
    Then the response status code should be 200

  Scenario: Obtain a Company data from Student account
    Given Previously was registered a company with id "4062df16-b864-4d90-969c-5fbd1220a179"
    And I have a Student Role Account
    And I am logged in the application

    When I send a GET request to "/companies/4062df16-b864-4d90-969c-5fbd1220a179"

    Then the response status code should be 200

  Scenario: Get all Job Openings from determinated company
    Given Previously was registered a company with id "63252037-4292-46e4-bb5d-27966852f116"
    And This Company published several Job Openings
    And I have a Student Role Account
    And I am logged in the application

    When I send a GET request to "/companies/63252037-4292-46e4-bb5d-27966852f116/job_openings"

    Then the response status code should be 200
