const {
    Input,
    ButtonInput,
    ListGroup,
    ListGroupItem
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
        if(title!==""){
            Meteor.call('addTopic', title, description);
        }
    },
    renderTopics(){
        console.log("Method getting called");
        console.log(this.data.topics);
        return this.data.topics.map((topic) => {
            console.log("Definitely getting called");
            return(
            <ListGroupItem
                href={"/topic/" + topic._id}
                key={topic._id}
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
                <div className="row">
                    <div className="col-xs-12">
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
                                value={"Submit topic"}
                                />
                        </form>
                        <ListGroup>
                        {this.renderTopics()}
                        </ListGroup>
                    </div>
                </div>
            </div>
        );
    }
});
