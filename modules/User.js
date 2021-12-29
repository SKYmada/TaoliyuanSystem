const mongoose = require("./db.js")

//用户实体schema
const UserSchema = {
    name:String,
	username:String,
	password:String,
	sex:String,
	major:String,
	role_id:Number,
	lou_id:Number,
	room_id:Number,
	status:Number
}

const User = mongoose.model("User", UserSchema, "users")

//仅运行一次,创建管理员
// const admin = new User({name:'mjt',username:'admin',password:'admin',status:0});
// admin.save().then(()=> console.log("已创建管理员"))


module.exports = User
