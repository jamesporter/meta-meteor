const {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    Input,
    ButtonInput
    } = rbs;

MyNavbar = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
       return {
         currentUser: Meteor.user()

       };
     },
    render(){
            return (
                <Navbar brand={<a href="/">Meta</a>} inverse toggleNavKey={0}>
                    {this.data.currentUser.profile.name}
                </Navbar>
            )
        }
    }
);