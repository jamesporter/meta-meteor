Layout = React.createClass({
    //mixins: [ReactMeteorData],
    //getMeteorData() {
    //    return {
    //        questions: Questions.find({}, {sort: {createdAt: -1}}).fetch(),
    //        answers: Answers.find({}, {sort: {createdAt: -1}}).fetch(),
    //        currentUser: Meteor.user()
    //    };
    //},

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