Layout = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
       return {
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