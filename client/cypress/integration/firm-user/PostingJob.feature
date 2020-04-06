Feature: Firm User Scenarios

  I would like to post a job offering as a "firm" user

  Scenario: Logging in
    Given I open Home page
    When I click on "Login"
    And I type "ladislauandrasi@gmail.com" in "E-Mail" field
    And I type "test" in "Password" field
    And I click on "Login Button"
    Then I should see "Hello, Ladi" in "Navbar Login Section"

  Scenario: Posting Job
    Given I open Home page
    And I am logged in
    When I click on "Post an offer"
    And I type "Test Job Title" in "Job Title" field
    And I type "Test Job Position" in "Job Position" field
    And I type "Test Short Description" in "Job Short Description" field
    And I click on "Post Button"
    Then I should see "Test Job Title" in "Job Post"
    And I should see "Test Job Position" in "Job Post"
    And I should see "Test Short Description" in "Job Post"

  Scenario: Applying Job
    Given I open Home page
    And I am logged in
    When I click on "Apply Job"
    And I click on "Submit Apply Job"
    Then I should see "Successfully applied to job!"

  Scenario: Like Post
    Given I open Home page
    And I am logged in
    When I click on "Like Button"
    Then I should see "1"
