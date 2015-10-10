Meteor.publish("topics", function () {
    if (Meteor.user()) {
        return Topics.find()
    } else {
        return {}
    }
});
Meteor.publish("questions", function () {
    if (Meteor.user()) {
        return Questions.find()
    } else {
        return {}
    }
});
Meteor.publish("responses", function () {
    if (Meteor.user()) {
        return Responses.find()
    } else {
        return {}
    }
});