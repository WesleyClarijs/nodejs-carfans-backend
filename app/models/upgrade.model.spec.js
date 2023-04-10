var chai = require("chai");
var expect = chai.expect;

const db = require("../models");
const Upgrade = require("../models/car.model");


var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe("upgrade model", function() {
    beforeEach(async function () {});

    describe("unit tests", function() {
        it("should accept a valid upgrade", async function() {
            const testUpgrade = new db.upgrade({
                car_id: "123",
                user_id: "1",
                subject: "test",
                description: "test",
                category: "test",
                costs: 125,
                isDone: false,
                date: new Date()

            });

            new db.upgrade(testUpgrade).save();
            let count = db.upgrade.find(testUpgrade);
            expect(count).not.to.equal(null);

        });

        it("should reject a missing carId", async function () {
            const testUpgrade = new db.upgrade ({
                user_id: "1",
                subject: "test",
                description: "test",
                category: "test",
                costs: 125,
                isDone: false,
            });
      
            expect(new db.upgrade(testUpgrade).save()).to.be.rejectedWith(Error);
          });

          it("should reject a missing userId", async function () {
            const testUpgrade = new db.upgrade ({
                car_id: "123",
                subject: "test",
                description: "test",
                category: "test",
                costs: 125,
                isDone: false,
            });
      
            expect(new db.upgrade(testUpgrade).save()).to.be.rejectedWith(Error);
          });

          it("should reject a missing subject", async function () {
            const testUpgrade = new db.upgrade ({
                car_id: "123",
                user_id : "1",
                description: "test",
                category: "test",
                costs: 125,
                isDone: false,
            });
      
            expect(new db.upgrade(testUpgrade).save()).to.be.rejectedWith(Error);
            });

            it("should reject a missing category", async function () {
                const testUpgrade = new db.upgrade ({
                    car_id: "123",
                    user_id : "1",
                    subject: "test",
                    description: "test",
                    costs: 125,
                    isDone: false,
                });
          
                expect(new db.upgrade(testUpgrade).save()).to.be.rejectedWith(Error);
            });
        })
    })
