const {
    Input,
    ButtonInput
    } = rbs;

AddTopic = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {}
    },

    handleTopicAdd(event){
        event.preventDefault();
        var title = this.refs.topicTitle.getInputDOMNode().value.trim();
        var description = this.refs.topicDescription.getInputDOMNode().value.trim();
        if(title!==""){
            Meteor.call('addTopic', title, description, this.insertUpdateCallback);
        }
    },

    insertUpdateCallback(error, result) {
        if(error) {
            this.setState({error: error.error})
        } else {
            FlowRouter.go(`/`)
        }
    },

    getInitialState() {
        return {
            error: null
        }
    },

    render() {

        return (
            <div className="container">
                <h1>Add topic</h1>
                {
                    this.state.error ? 
                        <Alert bsStyle="warning">
                            <strong>Oh snap!</strong> {this.state.error}
                        </Alert> : ''

                }
                <form onSubmit={this.handleTopicAdd}>
                    <Input
                        type="text"
                        ref="topicTitle"
                        placeholder={"Type to add topic title"}
                        />
                    <Input
                        type="textarea"
                        ref="topicDescription"
                        placeholder={"Type to add topic description"}
                        />
                    <ButtonInput
                        type="submit"
                        value={"Add topic"}
                        bsStyle="btn-info"
                        />
                </form>
            </div> )
    }

})

