const mongoose = require("./db.js")

//用户实体schema
const UserSchema = {
    name:String,
	username:String,
	password:String,
	sex:String,
	major:String,
	role_id:{
		type:Number,
		default:1
	},
	lou_id:{
		type:Number,
		default:0
	},
	room_id:{
		type:Number,
		default:0
	},
	status:{
		type:Number,
		default:1
	}
}

const UserModel = mongoose.model("User", UserSchema, "users")

// // 仅运行一次,创建管理员
// const admin = new UserModel({name:'admin',username:'admin',password:'admin',role_id:0});

// admin.save().then(()=> console.log("已创建管理员"))


module.exports = UserModel;
