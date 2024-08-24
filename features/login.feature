Feature: Login to Sauce Demo

Background:
  Given I am on the Sauce Demo login page

Scenario Outline: User logs in with credentials
  When I login with username "<username>" and password "<password>"
  Then I should see "<message>"

  Examples:
    | username       | password      | message                      |
    | standard_user  | secret_sauce  | the inventory page           |
    | locked_out_user| secret_sauce  | a login error message        |
