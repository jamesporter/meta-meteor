const {
    ListGroupItem,
    Button,
    ButtonGroup,
    ButtonToolbar
    } = rbs;

Question = React.createClass({
    propTypes: {
        question: React.PropTypes.object.isRequired
    },
    showOwnerOptions(){
        return this.props.topic.ownerId == this.props.user._id;
    },
    showAnswer(){
        return this.props.question.marked;
    },
    handleResponse(option){
        console.log(option, this.props.question._id);
        //event.preventDefault();
        Meteor.call('addResponse', this.props.question._id, this.props.topic._id, option)
    },
    handleMark(option){
        console.log(option, this.props.question._id);
        //event.preventDefault();
        Meteor.call('markQuestion', this.props.question._id, option)
    },
    handleDelete(questionId){
        Meteor.call('removeQuestion', questionId)
    },
    renderOptions(){
        return this.props.question.options.map((opt, index) => {
            console.log("renderOptions is called");
            return(
              <Button
                  key={index}
                  onClick={()=> {this.handleResponse(opt); }}>
                  {opt}
              </Button>
            );
        })
    },
    renderMarkOptions(){
        return this.props.question.options.map((opt, index) => {
            return(
                <Button
                    key={index}
                    onClick={()=> {this.handleMark(opt); }}>
                    {opt}
                </Button>
            );
        })
    },
    render(){
        return (
            <ListGroupItem>
                <div className="row">
                    <div className="col-md-6">
                        <h2>{this.props.question.questionText + " (" + this.props.question.points + " points)"}</h2>
                    </div>
                    <div className="col-md-6">

                        { this.showOwnerOptions()?
                        <ButtonToolbar className="pull-right">
                            <Button href={"/topic/" + this.props.topic._id + "/question/" + this.props.question._id} >Edit</Button>
                            <Button onClick={()=> {this.handleDelete(this.props.question._id); }}>Delete</Button>
                        </ButtonToolbar>
                            :
                            ""}
                    </div>
                </div>


                {
                    this.showAnswer() ?
                    <div>
                        <p>The answer is:</p>
                        <p>{this.props.question.answer}</p>
                    </div>:
                    ""
                }

                {
                    this.props.response ?
                    <p>You chose: {this.props.response.option}</p> :
                    <p>Please choose an option</p>
                }

                <div>
                {
                    this.props.response ?
                    "":
                    <ButtonGroup vertical>
                        {this.renderOptions()}
                    </ButtonGroup>}
                    <p className="small text-right text-muted">{this.props.question.ownerId === this.props.user._id ?
                        "You" : this.props.question.ownerName} asked {moment(this.props.question.createdAt).fromNow()}</p>
                }
                </div>

                <div>
                { this.showOwnerOptions() ?
                    <div>
                        <h2>Mark</h2>
                        <ButtonGroup vertical>
                            {this.renderMarkOptions()}
                        </ButtonGroup>
                    </div>:
                    ""
                }
                </div>
            </ListGroupItem>
        );
    }

});