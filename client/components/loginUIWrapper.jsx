const {
    Nav,
    NavItem
    } = rbs;

LoginUIWrapper = React.createClass({
    componentDidMount() {
        // Use Meteor Blaze to render login buttons
        this.view = Blaze.render(Template.atNavButton,
            React.findDOMNode(this.refs.container));
    },
    componentWillUnmount() {
        // Clean up Blaze view
        Blaze.remove(this.view);
    },
    render() {
        // Just render a placeholder container that will be filled in
        return (
            <Nav right>
                <NavItem ref="container"></NavItem>
            </Nav>
        );
    }
});
