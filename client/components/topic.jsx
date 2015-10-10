const {Button} = rbs;

Topic = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            topics: Topics.find({}, {sort: {createdAt: -1}}).fetch(),
            questions: Questions.find({ topicId: this.props.topicId}, {sort: {points: -1}}).fetch()
        };
    },



    renderQuestions(){
        return this.data.questions.map((question) => {
                return (
                    <Question key={question._id} question={question}/>
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
                        <Button bsStyle="primary" href="/topic/{this.props.topicId}/question">Add</Button>
                        {this.renderQuestions()}
                    </div>
                </div>
            </div>
        );
    }
});