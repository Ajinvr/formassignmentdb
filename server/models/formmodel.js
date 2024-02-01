const mongoose = require("mongoose");

const userformdataschema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"please add the contact name"]
    },
    email:{
        type:String,
        required:[true,"please add the email address"]
    },
    password:{
        type:String,
        required:[true,"please add a password"]
    },
},
{
    timestamps:true
}
)

module.exports= mongoose.model("form",userformdataschema)
