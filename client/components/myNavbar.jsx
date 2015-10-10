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
            <Navbar brand={<a href="/">Meta</a>} inverse>
                { this.data.currentUser ?
                    <Nav right>
                        <NavItem href="/logout">Logout</NavItem>
                    </Nav>
                    :""
                }
            </Navbar>)
    }
});
