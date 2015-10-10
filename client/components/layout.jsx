Layout = React.createClass({
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