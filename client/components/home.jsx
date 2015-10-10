const {
    Input,
    ButtonInput
    } = rbs;

Home = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            topics: Topics.find({}, {sort: {createdAt: -1}}).fetch()
        };
    },
    handleTopicAdd(event){
        event.preventDefault();
        var title = this.refs.topicTitle.getInputDOMNode().value.trim();
        var description = this.refs.topicDescription.getInputDOMNode().value.trim();
        if(text!==""){
            Meteor.call('addTopic', title, description);
        }
    },
    renderTopics(){
        return this.data.topics.map((topic) => {
            return(
            <ListGroupItem
                header={<p>{topic.title}</p>}>
                <p>{topic.description}</p>
            </ListGroupItem>
            )
        })
    },
    render(){
        return (
            <div className="container">
                <AccountsUIWrapper />
                <form onSubmit={this.handleTopicAdd()}>
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
                        value={"Submit topic"}
                        />
                </form>
                <div className="row">
                    <div className="col-xs-12">
                        <ListGroup>
                        {this.renderTopics()}
                        </ListGroup>
                    </div>
                </div>
            </div>
        );
    }
});