const {
    Input,
    ButtonInput,
    Button,
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
                    <h2>Events</h2>
                    <p>Choose an event to start playing</p>
                    <div className="col-xs-12">
                        <div className="floating">
                            <Button bsStyle="btn-danger btn-floating" href={"/topic"}>+</Button>
                        </div>
                        <ListGroup>
                        {this.renderTopics()}
                        </ListGroup>
                    </div>
                </div>
            </div>
        );
    }
});
