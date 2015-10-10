const {
    Button,
    ListGroup
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
                        response={this.findResponse}/>
                )
            }
        );
    },
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>List of questions for a particular topic</h1>
                        <Button bsStyle="primary" href={"/topic/" + this.props.topicId + "/question"}>Add question</Button>
                        <ListGroup>
                            {this.renderQuestions()}
                        </ListGroup>
                    </div>
                </div>
            </div>
        );
    }
});