const neo4j = require("neo4j-driver");
// require('dotenv').config()

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

  // dropAll: "MATCH (n) DETACH DELETE n",
  // // start following a trainer.
  // follow:
  //   "MERGE (follower:User {id:$followerId}) MERGE (trainer:Trainer {id: $trainerId}) MERGE (follower)-[:FOLLOWS]->(trainer)",
  // // start unfollowing a user.
  // unfollow:
  //   "MATCH((follower:User{id:$followerId})-[r:FOLLOWS]->(trainer:Trainer{id: $trainerId})) DELETE r",
  // // return all trainers that one user follows.
  // isFollowing:
  //   "MATCH((follower:User{id:$followerId})-[:FOLLOWS]->(trainer)) RETURN collect(DISTINCT trainer.id) as trainerIds",
};

