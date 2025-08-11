const mongoose = require("mongoose");

const dbConfig = async() =>{
    await mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Database connected");
    })
}

module.exports = dbConfig;