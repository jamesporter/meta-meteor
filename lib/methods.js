Meteor.methods({
    addTopic(title, description){
        if(!Meteor.userId()){
            throw new Meteor.Error("Not authorized");
        }
        Topics.insert({
            title: title,
            description: description,
            ownerId: Meteor.userId(),
            ownerName: Meteor.user().emails[0].address,
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
                ownerName: Meteor.user().emails[0].address,
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

            if(count > 0){
                //work out total
                const pointsAwarded = question.points / count;

                _.each(correct, (response) => {
                    //give each user their share of points
                    Awards.insert({
                        topicId: question.topicId,
                        personId: response.ownerId,
                        personName: response.ownerName,
                        points: pointsAwarded,
                        questionId: questionId
                    });
                })
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
            ownerName: Meteor.user().emails[0].address,
            questionId,
            topicId,
            option
        });
    }
});
