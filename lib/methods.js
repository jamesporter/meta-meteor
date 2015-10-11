Meteor.methods({
    addTopic(title, description){
        if(!Meteor.userId()){
            throw new Meteor.Error("Not authorized");
        }
        Topics.insert({
            title: title,
            description: description,
            ownerId: Meteor.userId(),
            ownerName: Meteor.user().username,
            createdAt: new Date()
        });
    },
    addQuestion(questionText, points, opts, topicId){
        if(!Meteor.userId()){
            throw new Meteor.Error("Not authorized");
        }
        const options = opts.split("\n");
        if(_.isArray(options) && options.length > 1){
            Questions.insert({
                questionText,
                options,
                topicId,
                ownerId: Meteor.userId(),
                ownerName: Meteor.user().username,
                createdAt: new Date(),
                marked: false,
                answer: "",
                points
            });
        }else{
            throw new Meteor.Error("Insufficient Options");
        }
    },
    updateQuestion(questionText, points, opts, questionId){
        if(!Meteor.userId()){
            throw new Meteor.Error("Not authorized");
        }

        const options = opts.split("\n");
        if (!_.isArray(options) || options.length < 2) {
            throw new Meteor.Error("Insufficient Options");
        }

        if(!questionId) {
            throw new Meteor.Error("Non-existent question");
        }

        Questions.update(questionId, {$set: {
            questionText,
            options,
            points
            }
        });
    },
    markQuestion(questionId, answer){
        if(!Meteor.userId()){
            throw new Meteor.Error("Not authorized");
        }

        const question = Questions.findOne(questionId);

        if(Meteor.userId() != question.ownerId){
            throw new Meteor.Error("You don't own this question");
        }

        if(question){
            //add answer to question $set...
            Questions.update(questionId, {
                $set: {
                    marked: true,
                    answer
                }
            });

            //find any users with correct answer...
            const correct = Responses.find({questionId, option: answer}).fetch();
            const count = correct.length;

            if(length > 0){
                //work out total
                const pointsAwarded = question.points / length;

                //give each user their share of points
                Awards.insert({
                    topic: question.topicId,
                    personId:Meteor.userId(),
                    points: pointsAwarded,
                    questionId: questionId
                });
            }
        }
    },
    removeQuestion(questionId){
        if(!Meteor.userId()){
            throw new Meteor.Error("Not authorized");
        }

        if(!questionId) {
            throw new Meteor.Error("Non-existent question");
        }

        Questions.remove(questionId);
    },
    addResponse(questionId, topicId, option){
        if(!Meteor.userId()){
            throw new Meteor.Error("Not authorized");
        }
        Responses.insert({
            ownerId: Meteor.userId(),
            questionId,
            topicId,
            option
        });
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
