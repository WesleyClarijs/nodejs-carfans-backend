module.exports = {
    jwtSecretKey: process.env.SECRET || "secret",

    //Local Database:
    //url: "mongodb://127.0.0.1:27017/CarFans_db"

    //Deployed Database:
    url: "mongodb+srv://WClarijs:UFi4gHn35moTDxwZ@projectcluster.uxdkf.mongodb.net/CarFans_db?retryWrites=true&w=majority"
};