const {
    ListGroup,
    ListGroupItem
    } = rbs;

Leaderboard = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            awards: Awards.find({topicId: this.props.topic._id}, {sort: {createdAt: -1}}).fetch()
        };
    },
    renderUsers(){
        console.log("awards", this.data.awards);
        var userList = this.data.awards.map((award) => {
            return {id: award.personId, username: award.personName};
        });
        userList = _.uniq(userList);
        console.log("userList", userList);
        return userList.map((user) => {
            var userAwards = _.filter(this.data.awards, function (award) {
                return award.personId === user.id
            });
            var score = 0;
            for (var i = 0; i < userAwards.length; i++) {
                score += userAwards.points;
            }
            console.log(user.id, score)
            return (
                <ListGroupItem
                    key={user.id}
                    header={<p><strong>{user.username}</strong></p>}>
                    <p>{score}</p>
                </ListGroupItem>
            );
        });
    },
    render() {
        return (
            <ListGroup>
                {this.renderUsers()}
            </ListGroup>
        );
    }
});
