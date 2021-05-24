
Feature: Student
  The student features

  Scenario: Obtain a self student data
    Given I have a Student Role Account with id "ab1d3820-a3e2-4ff8-b5d0-6ef270deb2f7"
    And I am logged in the application

    When I send a GET request to "/students/ab1d3820-a3e2-4ff8-b5d0-6ef270deb2f7"

    Then the response status code should be 200

  Scenario: Get a 403 status when try upgrade a student with diferent id param
    Given I have a Student Role Account with id "31be6da3-8302-4c57-8ea8-a398343ec648"
    And I am logged in the application

    When I send a PUT request to "/students/9b5e7261-ff1e-4b8c-bf25-5909b0c831e2" with body:
    """
    {
      "name" : "quibusdam",
      "surname" : "nihil",
      "lastname" : "ipsum",
      "qualification" :
        {
            "title" : "Ingenierio Aeronautico",
            "start_date" : "2020-08-18",
            "end_date" : "2020-08-27"
        },
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
    Then the response status code should be 403


  Scenario: Upgrade a student Qualification
    Given I have a Student Role Account with id "e204cdf4-e012-4915-84c8-f5c2a812176c"
    And I am logged in the application

    When I send a PUT request to "/students/e204cdf4-e012-4915-84c8-f5c2a812176c" with body:
    """
    {
      "qualification" :
        {
            "title" : "Ingenierio Aeronautico",
            "start_date" : "2020-08-18",
            "end_date" : "2020-08-27"
        }
    }
    """
    Then the response status code should be 200

Scenario: Upgrade a student with new data
    Given I have a Student Role Account with id "e6d3cd09-2985-441d-9c49-1c3f23d16a92"
    And I am logged in the application

    When I send a PUT request to "/students/e6d3cd09-2985-441d-9c49-1c3f23d16a92" with body:
    """
    {
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
