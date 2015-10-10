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
            console.log(this.data.currentUser);
            return (
                <Navbar brand={<a href="/">Meta</a>} inverse toggleNavKey={0}>
                    { this.data.currentUser ?
                        this.data.currentUser.profile.name:
                        'Link here'
                    }

                </Navbar>
            )
        }
    }
);