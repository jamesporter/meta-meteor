const {
    Input,
    ButtonInput,
    Alert,
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
        return !this.data.questionId;
    },

    handleCreateOrUpdate() {
        event.preventDefault();
        var text = this.refs.text.getInputDOMNode().value.trim();
        var options = this.refs.options.getInputDOMNode().value.trim();
        var questionId = this.data.questionId;

        if(questionId){
            Meteor.call('updateQuestion', text, options, questionId, this.insertUpdateCallback);
        } else {
            Meteor.call('addQuestion', text, options, this.data.topicId, this.insertUpdateCallback);
        }
    },

    insertUpdateCallback(error, result) {
        if(error) {
            this.setState({error: error.error})
        } else {
            FlowRouter.go(`/topic/${this.data.topicId}`)
        }
    },

    getInitialState() {
        return {
            error: null
        }
    },

    render(){
        let question = this.data.question;
        let options = question.options || [];
        options = options.join("\n")

        return (
            <div className="container">
                {
                    this.isCreating() ?
                    <h1>Add question</h1> :
                    <h1>Edit question</h1>
                }
                {
                    this.state.error ? 
                        <Alert bsStyle="warning">
                            <strong>Oh snap!</strong> {this.state.error}
                        </Alert> : ''

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
