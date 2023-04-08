const e = require("express");
const neo = require("../../neo");
const db = require("../models");
const users = db.user;

module.exports = {
  async follow(req, res) {

    if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/) || !req.params.userToFollowId.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(500).send("one of the id's is not a valid id")
    } else {

    const follower = await users.findOne( {_id : req.params.userId});
    const userToFollow = await users.findById(req.params.userToFollowId);
    console.log(follower)

      if (follower == undefined || follower == null) {
        res.status(404).send("user does not exist");
      }

      else if (userToFollow == undefined || userToFollow == null) {
        res.status(404).send("the user you want to follow does not exist")
      } else {
    try {
      

      // begin session
      const session = neo.session();

      await session.run(neo.follow, {
        // ObjectIds to string
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

//   async unFollow(req, res) {
//     try {
//       const follower = await User.findById(req.user._id);

//       // check if user exists
//       if (!follower) {
//         return res.status(404).send("User (follower) does not exist.");
//       }

//       const trainer = await Trainer.findById(req.params.id);

//       // check if trainer exists
//       if (!trainer) {
//         return res.status(400).send("trainer to be followed does not exist.");
//       }

//       // start session
//       const session = neo.session();

//       await session.run(neo.unfollow, {
//         followerId: follower._id.toString(),
//         trainerId: trainer._id.toString(),
//       });

//       res.status(200).send("User has now unfollowed a trainer");
//     } catch (err) {
//       res.status(500).send("Error: " + err);
//     }
//   },

//   async getFollowedTrainers(req, res) {
//     try {
//       const follower = await User.findById(req.user._id);

//       // check if user exist
//       if (!follower) {
//         return res.status(404).send("User (follower) does not exist.");
//       }

//       // start session
//       const session = neo.session();

//       const result = await session.run(neo.isFollowing, {
//         followerId: follower._id.toString(),
//       });

//       const trainerIds = result.records[0].get("trainerIds");

//       session.close();

//       // find all the followed users in a User (follower)
//       const user = await User.find(
//         { _id: { $in: trainerIds } },
//         { password: 0 }
//       );

//       res.status(200).send(user);
//     } catch (err) {
//       res.status(500).send("Error: " + err);
//     }
//   },
 };
