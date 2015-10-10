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
            topics: Topics.find({}, {sort: {createdAt: -1}}).fetch(),
            currentUser: Meteor.user()
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
        return this.data.topics.map((topic) => {
            return(
            <ListGroupItem
                href={"/topic/" + topic._id}
                key={topic._id}
                header={<p><strong>{topic.title}</strong></p>}>
                <p>{topic.description}</p>
                <p className="small text-right text-muted">{topic.ownerId === this.data.currentUser._id ?
                    "You" : topic.ownerName} added {moment(topic.createdAt).fromNow()}</p>
            </ListGroupItem>
            )
        })
    },
    render(){
        return (
            <div className="container">
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
                                value={"Add topic"}
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
