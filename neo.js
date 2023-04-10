const neo4j = require("neo4j-driver");

module.exports = {
  connect(dbName) {
    this.dbName = dbName;
    this.driver = driver = neo4j.driver(
      //LOCAL DB
      //"bolt://localhost:7687",
      //neo4j.auth.basic("neo4j", "wesley123")
      // ONLINE DB
      "bolt+s://c350b056.databases.neo4j.io:7687",
      neo4j.auth.basic("neo4j", "Y2jos6MpDgzUcb-ybwBBeexXQeyfvDETjMLgdyFaQ9Y")
    );
  },

  session() {
    return this.driver.session({
      database: this.dbName,
      defaultAccessMode: neo4j.session.WRITE,
    });
  },

  dropAll: "MATCH (n) DETACH DELETE n",
  // create a user.
  create:
    "CREATE (n:User {mongoId : $mongoId, emailAddress: $emailAddress, userName: $userName})",
  // start following a user.
  follow:
    "MERGE (follower:User {mongoId:$followerId}) MERGE (user:User {mongoId: $userId}) MERGE (follower)-[:FOLLOWS]->(user)",
  // start unfollowing a user.
  unfollow:
    "MATCH((follower:User{mongoId:$userId})-[r:FOLLOWS]->(user:User{mongoId: $userToUnfollowId})) DELETE r",
  // return all users that one user follows.
  isFollowing:
    "MATCH((follower:User{mongoId:$followerId})-[:FOLLOWS]->(user)) RETURN collect(DISTINCT user.mongoId) as userIds",
};
