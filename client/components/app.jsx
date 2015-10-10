const {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    Input,
    ButtonInput,
    Panel
    } = rbs;

App = React.createClass({
    mixins: [ReactMeteorData],
    getInitialState(){
        return {textValue:"", selectValue:""}
    },
    getMeteorData() {
        return {
            questions: Questions.find({}, {sort: {createdAt: -1}}).fetch(),
            answers: Answers.find({}, {sort: {createdAt: -1}}).fetch(),
            currentUser: Meteor.user()
        };
    },

    render(){
        return (
            <div className="container">
                <h1>Test</h1>
            </div>
        );
    }
});