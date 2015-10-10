Layout = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            topics: Topics.find({}, {sort: {createdAt: -1}}).fetch(),
            questions: Questions.find({}, {sort: {createdAt: -1}}).fetch(),
            responses: Responses.find({}, {sort: {createdAt: -1}}).fetch(),
            currentUser: Meteor.user()
        };
    },
    render() {
        return <div>
            <header>
                <MyNavbar/>
            </header>
            <main>
                {this.props.content}
            </main>
            <footer>
            </footer>
        </div>
    }
});