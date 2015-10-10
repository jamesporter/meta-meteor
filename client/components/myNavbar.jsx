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
    render(){
            return (
                <Navbar brand={<a href="/">Meta</a>} inverse toggleNavKey={0}>
                </Navbar>
            )
        }
    }
);