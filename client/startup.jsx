Meteor.subscribe("questions");
Meteor.subscribe("answers");

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});