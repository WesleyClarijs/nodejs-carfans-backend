const chai = require('chai')
const expect = chai.expect

const requester = require('../../requester.spec');
const { repair } = require('../models');
const db = require('../models');

const Repair = require('../models/repair.model')();


describe('user endpoints', function(){
    beforeEach(async () => {
        // We will use this user for the tests.
        const testRepair = new Repair({
            _id: "1",
            car_id: "123",
            user_id: "1",
            subject: "test",
            description: "test",
            isMechanicalProblem : true,
            problemSince: new Date(),
            isRepaired: false,
    })
            testRepair.save();

    describe('integration tests', function(){
        it('(GET/repairs) should retrieve the repairs', async function(){

            const res = await requester
            .get('api/repairs')

            expect(res).to.have.status(200)

            repairs = res.body

            expect(repairs).of.length(1)
            const repair = repairs[0]
            expect(repair).to.not.have.property('password')
            expect(repair).to.have.property('subject', 'test')
        })

    })
    describe('integration tests', function(){
        it('(GET/repairs/:id) should retrieve the repairs', async function(){

            const res = await requester
            .get('api/repairs/1')

            expect(res).to.have.status(200)

            repairs = res.body

            expect(repairs).of.length(1)
            const repair = repairs[0]
            expect(repair).to.not.have.property('password')
            expect(repair).to.have.property('subject', 'test')
        })
    })
})
})