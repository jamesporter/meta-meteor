const {
    Button,
    ListGroup,
    ButtonToolbar
    } = rbs;

Topic = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            user: Meteor.user(),
            topic: Topics.findOne(this.props.topicId),
            questions: Questions.find({ topicId: this.props.topicId}, {sort: {points: -1}}).fetch(),
            responses: Responses.find({ownerId: Meteor.userId(), topicId: this.props.topicId}).fetch()
        };
    },
    findResponse(questionId){
        return _.find(this.data.responses, function(response){
            return response.questionId === questionId;
        });
    },
    renderQuestions(){
        return this.data.questions.map((question) => {
                return (
                    <Question
                        key={question._id}
                        question={question}
                        topic={this.data.topic}
                        user={this.data.user}
                        response={this.findResponse(question._id)}/>
                )
            }
        );
    },

    renderAddQuestion() {
        console.log(this.data.topic.ownerId, Meteor.userId(), this.data.topic.ownerId == Meteor.userId())
        if (this.data.topic.ownerId == Meteor.userId()) {
            return (
                <ButtonToolbar>
                    <Button bsStyle="primary" href={"/topic/" + this.props.topicId + "/question"}>Add question</Button>
                </ButtonToolbar>
            )
        }
    },

    determineHashtag() {
        //determine what is the topic about
        console.log(this.data.topic.title);
        return "hashtag";

    },

    hasWhiteSpace(s) {
      return s.indexOf(" ") >= 0;
    },

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>Questions for <strong>{this.data.topic.title}</strong></h1> 
                        <h2><a href={"https://twitter.com/search?q=%23"+this.determineHashtag()}>#{this.determineHashtag()}</a></h2>
                        { this.renderAddQuestion() }
                        <ListGroup>
                            {this.renderQuestions()}
                        </ListGroup>
                    </div>
                </div>
            </div>
        );
    }
});
