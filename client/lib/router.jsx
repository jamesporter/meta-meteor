FlowRouter.route('/', {
    action: function() {
        ReactLayout.render(Layout, {
            content: <App/>
        });
    }
});