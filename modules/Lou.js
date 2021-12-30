const mongoose = require("./db.js")

//用户实体schema
const LouSchema = {
	number:Number,
    name:String,
	status:{
		type:Number,
		default:1
	}
}

const LouModel = mongoose.model("Lou", LouSchema, "lous")


module.exports = LouModel;