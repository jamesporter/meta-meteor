Meteor.publish("topics", function () {
    if (this.userId) {
        return Topics.find()
    } else {
        this.ready()
    }
});
Meteor.publish("questions", function () {
    if (this.userId) {
        return Questions.find()
    } else {
        this.ready()
    }
});
Meteor.publish("responses", function () {
    if (this.userId) {
        return Responses.find()
    } else {
        this.ready()
    }
});