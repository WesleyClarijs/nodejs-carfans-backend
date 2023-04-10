const chai = require('chai')

// make chai work with http requests
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('./server')

// export an object that receives test requests
// chai calls 'listen' on the server object
// keepOpen makes sure the server is not closed after a test
let requester = chai.request(server).keepOpen()
module.exports = requester

// close the server after all tests
after(function() {
    requester.close()
})