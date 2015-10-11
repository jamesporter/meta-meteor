Meteor.publish("topics", function () {
    if (this.userId) {
        return Topics.find()
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
Meteor.publish("awards", function () {
    if (this.userId) {
        return Awards.find()
    } else {
        this.ready()
    }
});