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
    handleResponse(option){
        console.log(option, this.props.question._id);
        //event.preventDefault();
        Meteor.call('addResponse', this.props.question._id, this.props.topic._id, option)
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
    render(){
        return (
            <ListGroupItem>
                <div className="row">
                    <div className="col-md-6">
                        <h2>{this.props.question.questionText + " (" + this.props.question.points + " points)"}</h2>
                    </div>
                    <div className="col-md-6">

                        { this.showOwnerOptions()?
                        <ButtonToolbar>
                            <Button>Mark</Button>
                            <Button href={"/topic/" + this.props.topic._id + "/question/" + this.props.question._id} >Edit</Button>
                            <Button>Delete</Button>
                        </ButtonToolbar>
                            :
                            ""}
                    </div>
                </div>

                {this.props.response ?
                    <p>You chose: {this.props.response.option}</p> :
                <p>Please choose an option</p>}

                {this.props.response ? "" :
                    <ButtonGroup vertical>
                        {this.renderOptions()}
                    </ButtonGroup>}

            </ListGroupItem>
        );
    }

});