const neo = require("../../neo");
const db = require("../models");
const users = db.user;

module.exports = {
  async follow(req, res) {
    
    // Check if id's are mongoId format
    if (
      !req.params.userId.match(/^[0-9a-fA-F]{24}$/) ||
      !req.params.userToFollowId.match(/^[0-9a-fA-F]{24}$/)
    ) {
      res.status(500).send("one of the id's is not a valid id");
    } else {
      const follower = await users.findOne({ _id: req.params.userId });
      const userToFollow = await users.findById(req.params.userToFollowId);
      console.log(follower);

      //Check if users exist in mongoDb
      if (follower == undefined || follower == null) {
        res.status(404).send("user does not exist");
      } else if (userToFollow == undefined || userToFollow == null) {
        res.status(404).send("the user you want to follow does not exist");
      } else {
        
        try {
          // begin session
          const session = neo.session();

          await session.run(neo.follow, {
            followerId: req.params.userId.toString(),
            userId: req.params.userToFollowId.toString(),
          });

          res.status(200).send("User is now following an other user");
        } catch (err) {
          res.status(500).send("Error: " + err);
        }
      }
    }
  },

    async unFollow(req, res) {
        // check if user exists
        if (
          !req.params.userToUnfollowId.match(/^[0-9a-fA-F]{24}$/) ||
          !req.params.userId.match(/^[0-9a-fA-F]{24}$/)
        ) {
          res.status(500).send("one of the id's is not a valid id");
        } else {
          const user = await users.findById(req.params.userId);
          const userToUnfollow = await users.findById(req.params.userToUnfollowId);

          if (user == undefined || user == null) {
            res.status(404).send("user does not exist");
          } else if (userToUnfollow == undefined || userToUnfollow == null) {
            res.status(404).send("the user you want to follow does not exist");
          } else {
            try {
        // start session
        const session = neo.session();

        await session.run(neo.unfollow, {
          userId: user._id.toString(),
          userToUnfollowId: userToUnfollow._id.toString(),
        });

        res.status(200).send("User has now unfollowed a trainer");
      } catch (err) {
        res.status(500).send("Error: " + err);
      }
    }
  }
},

    async getFollowedUsers(req, res) {
        
      if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(500).send("one of the id's is not a valid id");
        } 

        const follower = await users.findById(req.params.userId);

        // check if user exist
        if (follower == null || follower == undefined) {
          return res.status(404).send("User (follower) does not exist.");
        
        } else {
          try  {
        // start session
        const session = neo.session();

        const result = await session.run(neo.isFollowing, {
          followerId: req.params.userId.toString(),
        });

        const userIds = result.records[0].get("userIds");

        session.close();

        res.status(200).send(userIds);
 
  }catch (err) {
        res.status(500).send("Error: " + err);
      }
    }
  }
}
   