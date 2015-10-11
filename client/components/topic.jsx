const {
    Button,
    ListGroup,
    ButtonToolbar,
    Nav,
    NavItem
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
                        response={this.findResponse(question._id)}/>
                )
            }
        );
    },

    renderAddQuestion() {
        console.log(this.data.topic.ownerId, Meteor.userId(), this.data.topic.ownerId == Meteor.userId())
        if (this.data.topic.ownerId == Meteor.userId()) {
            return (
                <div className="floating">
                    <Button bsStyle="btn-danger btn-floating" href={"/topic/" + this.props.topicId + "/question"}>+</Button>
                </div>
            )
        }
    },

    renderQuestionTab() {
        return (
            <div>
                {this.renderAddQuestion()}
                <ListGroup>
                    {this.renderQuestions()}
                </ListGroup>
            </div>
        )
    },


    getInitialState() {
        return {
            selectedTab: "Questions"
        }
    },

    handleSelect(tabName) {
        this.setState({selectedTab: tabName})
    },

    render() {


        var feed = new Instafeed({
            get: "tagged",
            tagName: determineHashtag(this.data.topic.title),
            clientId: "99168047378c46e4b7daf7f3ae9eda47",
            sortBy: 'most-commented',
        });
        feed.run();


        let selectedTab = this.state.selectedTab;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>Questions for <strong>{this.data.topic.title}</strong></h1> 
                        <h2><a href={"https://twitter.com/search?q=%23"+determineHashtag(this.data.topic.title)}>#{determineHashtag(this.data.topic.title)}</a></h2>

                        { this.renderAddQuestion() }
                        <Nav activeKey={selectedTab} bsStyle="tabs" onSelect={this.handleSelect}>
                            <NavItem eventKey={"Questions"}>Questions</NavItem>
                            <NavItem eventKey={"Leaderboard"}>Leaderboard</NavItem>
                        </Nav>
                        { 
                            (selectedTab == "Questions") ?
                                this.renderQuestionTab()
                                :
                                <Leaderboard />
                        }
                        <h2>From the Instawebs on #{determineHashtag(this.data.topic.title)}</h2>
                        <div id="instafeed"></div>
                    </div>
                </div>
            </div>
        );
    }
});
