Meteor.subscribe("topics");
Meteor.subscribe("questions");
Meteor.subscribe("responses");

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});