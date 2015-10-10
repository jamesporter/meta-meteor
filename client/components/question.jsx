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
    renderOptions(){
        return this.props.question.options.map( opt => {
            return(

              <Button>{opt}</Button>
            );
        })
    },
    render(){
        return (
            <ListGroupItem>
                <h2>{this.props.question.questionText}</h2>

                { this.showOwnerOptions()?
                <ButtonToolbar>
                    <Button>Mark</Button>
                    <Button href={"/topic/" + this.props.topic._id + "/question/" + this.props.question._id} >Edit</Button>
                    <Button>Delete</Button>
                </ButtonToolbar>
                    :
                    ""}

                <p>Please choose an option</p>

                <ButtonGroup vertical>
                    {this.renderOptions()}
                </ButtonGroup>
            </ListGroupItem>
        );
    }

});