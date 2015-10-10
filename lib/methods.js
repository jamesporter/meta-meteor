Meteor.methods({
    addQuestion: function(text, group){
        if(!Meteor.userId()){
            throw new Meteor.Error("not-authorized");
        }
        Questions.insert({
            text: text,
            createdAt: new Date(),
            ownerId: Meteor.userId(),
            username: Meteor.user().username,
            group: group
        });
    },
    addAnswer: function(text, question){
        Answers.update({
            owner: Meteor.userId(),
            questionId: question._id,
            latest: true
        }, {
            $set:{latest: false}
        });
        Answers.insert({
            text: text,
            questionId: question._id,
            teacherId: question.ownerId,
            createdAt: new Date(),
            ownerId: Meteor.userId(),
            username: Meteor.user().username,
            latest: true
        });
    },
    removeQuestion: function(questionId){
        const question = Questions.findOne(questionId);
        if (question.ownerId !== Meteor.userId()){
            throw new Meteor.Error("not-authorized");
        }
        Questions.remove(questionId);
        Answers.remove({questionId: questionId})
    },
    removeAnswer: function(answerId){
        const answer = Answers.findOne(answerId);
        if (answer.ownerId !== Meteor.userId()){
            throw new Meteor.Error("not-authorized");
        }
        Answers.remove(answerId);
    },
    addFeedback: function(text, answer){
        //if (answer.teacherId !== Meteor.userId()){
        //    throw new Meteor.Error("not-authorized");
        //}
        //var answerId = answer._id;
        var results = Answers.update(answer._id, {$set:{feedback: {text:text, createdAt:new Date()}}});
    }
});