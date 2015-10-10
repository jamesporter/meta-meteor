FlowRouter.route('/login', {
    action: function() {
        ReactLayout.render(Layout, {
            content: <Login/>
        });
    }
});
FlowRouter.notFound = {
    action: function() {
        ReactLayout.render(Layout,{
            content: <h1>Not found!</h1>
        });
    }
};
var loggedIn = FlowRouter.group({
    triggersEnter: [function() {
        var route;
        if (!(Meteor.loggingIn() || Meteor.userId())) {
            return FlowRouter.go('/login');
        }
    }]
});
loggedIn.route('/', {
    action: function() {
        ReactLayout.render(Layout, {
            content: <Home/>
        });
    }
});
loggedIn.route('/topic', {
    action: function() {
        ReactLayout.render(Layout, {
            content: <EditTopic/>
        });
    }
});
loggedIn.route('/topic/:topicId', {
    action: function(params) {
        ReactLayout.render(Layout, {
            content: <Topic {...params}/>
        });
    }
});
loggedIn.route('/topic/:topicId/question', {
    action: function(params) {
        ReactLayout.render(Layout, {
            content: <EditQuestion {...params}/>
        });
    }
});
loggedIn.route('/topic/:topicId/question/:questionId', {
    action: function() {
        ReactLayout.render(Layout, {
            content: <EditQuestion {...params}/>
        });
    }
});
loggedIn.route('/logout', {
    action: function() {
        return Meteor.logout(function(){
            FlowRouter.go('/login')
        });
    }
});
