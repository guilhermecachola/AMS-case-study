Feature: Intake Validation and Evidence Capture
  The goal of this feature is to validate that all projects have consistent data 
  and required supporting documentation before they are ready for a decision.

  # REQ links: REQ-002, REQ-003, REQ-004

  Scenario: Happy path — Successful submission of a low-risk project
    Given the user is on the project intake page
    And the user enters a budget of "50000"
    And the risk level is set to "Low"
    When the user clicks "Submit"
    Then the system should assign an intake identifier
    And the status should be "Ready to Decide"

  Scenario: Negative path — High risk project missing documentation
    Given the user has selected "High" as the risk level
    When the user attempts to validate without uploading a file
    Then the system should classify the intake as "Invalid"
    And an error message "Evidence required for High Risk projects" should be displayed

  Scenario: Alternative flow — Budget justification for large projects
    Given the user enters a budget of "150000"
    And the "Justification" field is visible
    When the user enters a justification with "More than twenty characters"
    Then the validation should pass for the budget field