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
            question = Questions.findOne(questionId);
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
        console.log(question);
        let options = question.options || [];
        options = options.join("\n")

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
                        placeholder="Type to add question text"
                        defaultValue={question.questionText}
                        />
                    <Input
                        type="textarea"
                        ref="options"
                        placeholder="Type the different options on a new line"
                        defaultValue={options}
                        />
                    <ButtonInput
                        type="submit"
                        value="Submit question"
                        />
                </form>
            </div>
        );
    }
});
