Feature: Avatar
  Although is indifferent to the user role, we use roles to reuse the "steps" before created

  Scenario: Upgrade my avatar with my company logo image
    Given I have a Company Role Account with id "60c72c72-00d0-4231-adb1-1be01c6a4e13"
    And I am logged in the application

    When Upload a image in a PUT request to "/avatar/60c72c72-00d0-4231-adb1-1be01c6a4e13"

    Then the response status code should be 200

  Scenario: Remove my avatar
    Given I have a Company Role Account with id "60c72c72-00d0-4231-adb1-1be01c6a4a13"
    And I am logged in the application

    When I send a DELETE request to "/avatar/60c72c72-00d0-4231-adb1-1be01c6a4a13"

    Then the response status code should be 200
