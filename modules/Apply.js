const mongoose = require("./db.js")

//申请表schema
const ApplySchema = {
	applicant:String,
    apply_time:String,
	auditor:{
		type:String,
		default:0,
	},
	audit_time:{
		type:String,
		default:0,
	},
	apply_lou_id:String,
	apply_room_id:String,
	status:{
		type:Number,
		default:0,
	}
}

const ApplyModel = mongoose.model("Apply", ApplySchema,"applys")


module.exports = ApplyModel;