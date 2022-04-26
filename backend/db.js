const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

// inotebook added in  above link- db name

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log ("Connected to MOngo Successfully");

    })
}
module.exports = connectToMongo;