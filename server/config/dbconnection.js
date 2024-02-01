const mongoose = require("mongoose")

const connectdb =  async ()=>{
try {

    const connect = await mongoose.connect(process.env.DBURL)
    console.log("connected to db =>",connect.connection.name);
    
} catch (error) {
    console.log(error);
}
}

module.exports = connectdb;