const mongoose = require("./db.js")

//楼层实体schema
const LouSchema = {
	lou_id:Number,
    name:String,
	person_num:{
		type:Number,
		default:0
	},
	build_time:String,
	remake:String,
	status:{
		type:Number,
		default:1
	}
}

const LouModel = mongoose.model("Lou", LouSchema, "lous")


module.exports = LouModel;