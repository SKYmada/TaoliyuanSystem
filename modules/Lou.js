const mongoose = require("./db.js")

//用户实体schema
const LouSchema = {
    name:String,
	role_id:Number,
	lou_id:Number,
	room_id:Number,
	status:{
		type:Number,
		default:1
	}
}

const LouModel = mongoose.model("Lou", LouSchema, "lous")


module.exports = LouModel;