const {
    ListGroupItem
    } = rbs;

Question = React.createClass({
    propTypes: {
        question: React.PropTypes.object.isRequired
    },
    render(){
        return (
            <ListGroupItem>{this.props.question.questionText}</ListGroupItem>
        );
    }

});