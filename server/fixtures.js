Meteor.publish("questions", function () {
    if(Roles.userIsInRole(this.userId, ['teacher'])){
        return Questions.find({
            ownerId: this.userId
        })
    }
    else if (Roles.userIsInRole(this.userId, ['student'])){
        return Questions.find({});
    }
});
Meteor.publish("answers", function (recent) {
    if(Roles.userIsInRole(this.userId, ['teacher'])){
        return Answers.find({
            teacherId: this.userId
        })
    }
    else if (Roles.userIsInRole(this.userId, ['student'])){
        return Answers.find({
            ownerId: this.userId
        })
    }
});