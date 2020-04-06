import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import UserActions from "../../../src/state/components/users/UserActions";
const user = {
    "_id" : "5e1c9ea081c3ef3008d3a221",
    "prefix" : "07",
    "email" : "ladislauandrasi@gmail.com",
    "nickname" : "Ladi",
    "firstName" : "Ladislau",
    "lastName" : "Andrasi",
    "password" : "test",
    "confirm" : "Andrasi17",
    "residence" : [
        "Giurgiu",
        "Crivina"
    ],
    "phone" : "2321326",
    "studies" : "BACHELOR",
    "currentPosition" : "Student",
    "profilePictureUrl" : "https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg",
    "bannerPictureUrl" : "https://image.freepik.com/free-vector/technology-banner-background-with-hexagonal-shapes-text-space_1017-22589.jpg",
    "userType" : "firm"
};

const url = "http://localhost:3000/";
const buttonSelectorMapper = {
    Login: '.login',
    "E-Mail": '#normal_login_email',
    Password: '#normal_login_password',
    "Login Button": '.login-form-button',
    "Success Message": '.anticon-check-circle',
    "Navbar Login Section": '.logged-in > * > span',
    "Post an offer": '.start-post-container > div',
    "Job Short Description": '.job-short-description-input',
    "Job Position": '.job-position-input',
    "Job Title": '.job-title-input',
    "Post Button": '.post-button',
    "Apply Job": "#0",
    "Last Name Apply Job": ".last_name_apply_job",
    "First Name Apply Job": ".first_name_apply_job",
    "Email Apply Job": ".email_apply_job",
    "Phone Apply Job": ".phone_apply_job",
    "Studies Apply Job": ".studies_apply_job",
    "Years Apply Job": ".years_worked_apply_job",
    "Submit Apply Job": ".submit-apply-job",
    "Like Button" : "#like-button"
};

Given(`I open Home page`, () => {
    cy.visit(url);
});


When(`I click on {string}`, itemName => {
    const selector = buttonSelectorMapper[itemName];
    cy.get(selector).click()
});

When(`I type {string} in {string} field`, (value, fieldName) => {
    const selector = buttonSelectorMapper[fieldName];
    cy.get(selector).type(value)
});


Then(`I should see {string}`, (value) => {
    cy.contains(value)
});

Then(`I should see {string} in {string}`, (value, fieldName) => {
    const selector = buttonSelectorMapper[fieldName];
    cy.contains(value)
});

Given(`I am logged in`, () => {
    cy.window().its('store')
        .then(
            store => store.dispatch(UserActions.upsert(user))
        );
});
