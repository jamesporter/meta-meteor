Meteor.publish("topics", function () {
    if (this.userId) {
        return Topics.find()
    } else {
        return {}
    }
});
Meteor.publish("questions", function () {
    if (this.userId) {
        return Questions.find()
    } else {
        return {}
    }
});
Meteor.publish("responses", function () {
    if (this.userId) {
        return Responses.find()
    } else {
        return {}
    }
});