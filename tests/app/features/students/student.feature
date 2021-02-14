Feature: Student Registry
  The next step after of create a new account is complete
  the registry of a student account.

  Scenario: Register a Student account
    Given I have a Student Role Account without complete register
    And I am logged in the application

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
    Given I have a Company Role Account
    And I am logged in the application

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
    Given I have a Student Role Account
    And I am logged in the application

    When I send a POST request with Auth header to "/students" with body:
    """
    {
      "name": "Juan",
      "surname": "Lopez",
      "lastname": "Fernandez"
    }
    """
    Then the response status code should be 400

  Scenario: Obtain a self student data
    Given I have a Student Role Account with id "a6829f16-d3b4-4351-a521-a21c03d73086"
    And I am logged in the application

    When I send a GET request to "/students/a6829f16-d3b4-4351-a521-a21c03d73086"

    Then the response status code should be 200

  Scenario: Upgrade a student with new data
    Given I have a Student Role Account
    And I am logged in the application

    When I send a PUT request with Auth header to "/students" with body:
    """
    {
      "name" : "quibusdam",
      "surname" : "nihil",
      "lastname" : "ipsum",
      "qualifications" : [
          {
              "title" : "omnis",
              "start_date" : "2020-08-18",
              "end_date" : "2020-08-27"
          }
      ],
      "languages" : [
          {
              "name" : "English",
              "speak" : 3,
              "write" : 4
          }
      ],
      "job_experiences" : [
          {
              "company" : "repudiandae",
              "position" : "eos",
              "responsibilities" : "minus",
              "start_date" : "2020-06-02",
              "end_date" : "2020-04-23"
          },
          {
              "company" : "intel",
              "position" : "ut",
              "responsibilities" : "aliquam",
              "start_date" : "2020-09-11",
              "end_date" : "2019-12-25"
          }
      ]
    }
    """
    Then the response status code should be 200
