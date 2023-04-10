// const chai = require('chai')
// const expect = chai.expect

// const requester = require('../../requester.spec');
// const db = require('../models');

// const User = require('../models/user.model')();


// describe('user endpoints', function(){
//     beforeEach(async () => {
//         // We will use this user for the tests.
//         const user = new db.user({userName: 'nameTest', password: 'secret', emailAddress: 'test@test.nl'})
//         await user.save()
//     })
//     describe('integration tests', function(){
//         it('(GET/user) should retrieve the users', async function(){

//             const res = await requester
//             .get('api/users')

//             expect(res).to.have.status(200)

//             users = res.body

//             expect(users).of.length(1)
//             const user = users[0]
//             expect(user).to.not.have.property('password')
//             expect(user).to.have.property('name', 'nameTest')
//         })

//     })
// })