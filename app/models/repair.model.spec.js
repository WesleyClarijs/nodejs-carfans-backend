var chai = require("chai");
var expect = chai.expect;

const db = require("../models");
const Repair = require("../models/repair.model");


var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe("repair model", function() {
    beforeEach(async function () {});

    describe("unit tests", function() {
        it("should accept a valid repair", async function() {
            const testRepair = new Repair({
                car_id: "123",
                user_id: "1",
                subject: "test",
                description: "test",
                isMechanicalProblem : true,
                problemSince: new Date(),
                isRepaired: false,
            });

            new Repair(testRepair).save();
            let count = Repair.find(testRepair);
            expect(count).not.to.equal(null);

        });

        it("should reject a missing carId", async function () {
            const testRepair = new Repair ({
                user_id: "1",
                subject: "test",
                description: "test",
                isMechanicalProblem : true,
                problemSince: new Date(),
                isRepaired: false,
            });
      
            expect(new Repair(testRepair).save()).to.be.rejectedWith(Error);
          });

          it("should reject a missing userId", async function () {
            const testRepair = new Repair ({
                car_id : "2",
                subject: "test",
                description: "test",
                isMechanicalProblem : true,
                problemSince: new Date(),
                isRepaired: false,
            });
      
            expect(new Repair(testRepair).save()).to.be.rejectedWith(Error);
          });

          it("should reject a missing description", async function () {
            const testRepair = new Repair ({
                user_id: "1",
                car_id: "2",
                subject: "test",
                isMechanicalProblem : true,
                problemSince: new Date(),
                isRepaired: false,
            });
      
            expect(new Repair(testRepair).save()).to.be.rejectedWith(Error);
          });

          it("should reject a missing subject", async function () {
            const testRepair = new Repair ({
                user_id: "1",
                car_id: "3",
                description: "test",
                isMechanicalProblem : true,
                problemSince: new Date(),
                isRepaired: false,
            });
      
            expect(new Repair(testRepair).save()).to.be.rejectedWith(Error);
          });
    })
})
