module.exports = app => {
const express = require('express')
const router = express.Router()

const followController = require('../controllers/follow.controller')
const authentication = require('../middleware/authenticate')

// Get all trainers that 1 user is following.
//router.get('/user/:userId/follow', followController.getFollowedTrainers)

// Create a follow to a trainer.
router.post('/users/:userId/userToFollow/:userToFollowId/follow', followController.follow)

// Delete a follow of a trainer
//router.delete('/user/:userId/trainer/:id/unfollow', followController.unFollow)

app.use('/api', router);
};