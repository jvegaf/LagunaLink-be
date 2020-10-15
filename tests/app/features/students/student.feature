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

  Scenario: Upgrade a student with new data
    Given I am logged in with a Student Role account previously registered
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
                "name" : "unde",
                "speak" : 3,
                "write" : 4
            }
        ],
        "job_experiences" : [
            {
                "company" : "repudiandae",
                "position" : "eos",
                "responsibilities" : "minus",
                "startDate" : "2020-06-02",
                "endDate" : "2020-04-23"
            },
            {
                "company" : "intel",
                "position" : "ut",
                "responsibilities" : "aliquam",
                "startDate" : "2020-09-11",
                "endDate" : "2019-12-25"
            }
        ]
    }
    """
    Then the response status code should be 200
