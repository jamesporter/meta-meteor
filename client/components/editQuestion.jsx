const {
    Input,
    ButtonInput,
    } = rbs;

EditQuestion = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        let topicId = this.props.topicId;
        let question = {};
        let questionId = this.props.questionId;

        if(questionId) {
            question = Questions.find({_id: questionId});
        }

        return {
            question,
            questionId,
            topicId 
        }
    },

    isCreating() {
        return _.isNull(this.data.questionId);
    },

    handleCreateOrUpdate() {
        event.preventDefault();
        console.log("handling insert");
        var text = this.refs.text.getInputDOMNode().value.trim();
        var options = this.refs.options.getInputDOMNode().value.trim();
        var topicId = this.data.topicId;
        var questionId = this.data.questionId;
        if(questionId){
            Meteor.call('updateQuestion', text, options, questionId);
        } else {
            Meteor.call('addQuestion', text, options, topicId);
        }
        FlowRouter.go(`/topic/${topicId}`)
    },

    render(){
        let question = this.data.question;
        return (
            <div className="container">
                {
                    this.isCreating() ?
                    <h1>Add question</h1> :
                    <h1>Edit question</h1>
                }
                <form onSubmit={this.handleCreateOrUpdate}>
                    <Input
                        type="text"
                        ref="text"
                        placeholder={"Type to add question text"}
                        value={question.text}
                        />
                    <Input
                        type="textarea"
                        ref="options"
                        placeholder={"Type the different options on a new line"}
                        value={question.options}
                        />
                    <ButtonInput
                        type="submit"
                        value={"Submit question"}
                        />
                </form>
            </div>
        );
    }
});
