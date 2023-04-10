module.exports = app => {
const express = require('express')
const router = express.Router()

const followController = require('../controllers/follow.controller')
const authentication = require('../middleware/authenticate')

// Get all users that 1 user is following.
router.get('/users/:userId/follows', followController.getFollowedUsers)

// Create a follow to a user.
router.post('/users/:userId/userToFollow/:userToFollowId/follow', authentication , followController.follow)

// Delete a follow of a user
router.delete('/users/:userId/userToUnfollow/:userToUnfollowId/unfollow', authentication ,followController.unFollow)

app.use('/api', router);
};