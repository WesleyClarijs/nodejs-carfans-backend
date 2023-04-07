const User = require("../models/user.model")();
const neo = require("../../neo");

module.exports = {
  async follow(req, res) {
    try {
      const follower = await User.findById(req.user._id);

    // check if user exists
      if (!follower) {
        return res.status(404).send("User (follower) does not exist.");
      }

      const trainer = await Trainer.findById(req.params.id);
    
      // check if trainer exists
      if (!trainer) {
        return res.status(400).send("User to be followed does not exist.");
      }

      // begin session
      const session = neo.session();

      await session.run(neo.follow, {
        // ObjectIds to string
        followerId: follower._id.toString(),
        trainerId: trainer._id.toString(),
      });

      res.status(200).send("User is now following an other user");
    } catch (err) {
      res.status(500).send("Error: " + err);
    }
  },

  async unFollow(req, res) {
    try {
      const follower = await User.findById(req.user._id);

      // check if user exists
      if (!follower) {
        return res.status(404).send("User (follower) does not exist.");
      }

      const trainer = await Trainer.findById(req.params.id);

      // check if trainer exists
      if (!trainer) {
        return res.status(400).send("trainer to be followed does not exist.");
      }

      // start session
      const session = neo.session();

      await session.run(neo.unfollow, {
        followerId: follower._id.toString(),
        trainerId: trainer._id.toString(),
      });

      res.status(200).send("User has now unfollowed a trainer");
    } catch (err) {
      res.status(500).send("Error: " + err);
    }
  },

  async getFollowedTrainers(req, res) {
    try {
      const follower = await User.findById(req.user._id);

      // check if user exist
      if (!follower) {
        return res.status(404).send("User (follower) does not exist.");
      }

      // start session
      const session = neo.session();

      const result = await session.run(neo.isFollowing, {
        followerId: follower._id.toString(),
      });

      const trainerIds = result.records[0].get("trainerIds");

      session.close();

      // find all the followed users in a User (follower)
      const user = await User.find(
        { _id: { $in: trainerIds } },
        { password: 0 }
      );

      res.status(200).send(user);
    } catch (err) {
      res.status(500).send("Error: " + err);
    }
  },
};
