Meteor.subscribe("topics");
Meteor.subscribe("questions");
Meteor.subscribe("responses");
Meteor.subscribe("awards");

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

Accounts.onLogin((e) => {FlowRouter.go("/"); } );