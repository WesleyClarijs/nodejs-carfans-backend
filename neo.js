const neo4j = require("neo4j-driver");

module.exports = {
  connect(dbName) {
    this.dbName = dbName;
    this.driver = driver = neo4j.driver(
      "bolt://localhost:7687",
      neo4j.auth.basic("neo4j", "wesley123")
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
    "MATCH((follower:User{id:$followerId})-[r:FOLLOWS]->(user:User{id: $userId})) DELETE r",
  // return all users that one user follows.
  isFollowing:
    "MATCH((follower:User{id:$followerId})-[:FOLLOWS]->(user)) RETURN collect(DISTINCT user.id) as userIds",
};

