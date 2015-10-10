Meteor.methods({
    addTopic(title, description){
        if(!Meteor.userId()){
            throw new Meteor.Error("Not authorized");
        }
        Topics.insert({
            title: title,
            description: description,
            ownerId: Meteor.userId(),
            ownerName: Meteor.user().username
        });
    },
    addQuestion(questionText, opts, topicId){
        if(!Meteor.userId()){
            throw new Meteor.Error("Not authorized");
        }
        const options = opts.split("\n");
        if(_.isArray(opts) && opts.length > 1){
            Questions.insert({
                questionText,
                options,
                topicId,
                ownerId: Meteor.userId()
            });
        }else{
            throw new Meteor.Error("Insufficient Options");
        }
    },
    updateQuestion(){
        if(!Meteor.userId()){
            throw new Meteor.Error("Not authorized");
        }


    },
    markQuestion(){
        if(!Meteor.userId()){
            throw new Meteor.Error("Not authorized");
        }


    },
    removeQuestion(){
        if(!Meteor.userId()){
            throw new Meteor.Error("Not authorized");
        }






    },
    addResponse(){
        if(!Meteor.userId()){
            throw new Meteor.Error("Not authorized");
        }


    }

    //addQuestion: function(text, group){
    //    if(!Meteor.userId()){
    //        throw new Meteor.Error("not-authorized");
    //    }
    //    Questions.insert({
    //        text: text,
    //        createdAt: new Date(),
    //        ownerId: Meteor.userId(),
    //        username: Meteor.user().username,
    //        group: group
    //    });
    //},
    //addAnswer: function(text, question){
    //    Answers.update({
    //        owner: Meteor.userId(),
    //        questionId: question._id,
    //        latest: true
    //    }, {
    //        $set:{latest: false}
    //    });
    //    Answers.insert({
    //        text: text,
    //        questionId: question._id,
    //        teacherId: question.ownerId,
    //        createdAt: new Date(),
    //        ownerId: Meteor.userId(),
    //        username: Meteor.user().username,
    //        latest: true
    //    });
    //},
    //removeQuestion: function(questionId){
    //    const question = Questions.findOne(questionId);
    //    if (question.ownerId !== Meteor.userId()){
    //        throw new Meteor.Error("not-authorized");
    //    }
    //    Questions.remove(questionId);
    //    Answers.remove({questionId: questionId})
    //},
    //removeAnswer: function(answerId){
    //    const answer = Answers.findOne(answerId);
    //    if (answer.ownerId !== Meteor.userId()){
    //        throw new Meteor.Error("not-authorized");
    //    }
    //    Answers.remove(answerId);
    //},
    //addFeedback: function(text, answer){
    //    //if (answer.teacherId !== Meteor.userId()){
    //    //    throw new Meteor.Error("not-authorized");
    //    //}
    //    //var answerId = answer._id;
    //    var results = Answers.update(answer._id, {$set:{feedback: {text:text, createdAt:new Date()}}});
    //}
});