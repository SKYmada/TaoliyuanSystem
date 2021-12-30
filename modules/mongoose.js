const UserModel = require("./User")
const LouModel = require("./Lou")

//在users表中插入数据
function addUser(name, username, password, sex,major,role_id, lou_id, room_id,status) {
    var user = new UserModel({
        name:name,
        username:username,
        password:password,
        sex:sex,
        major:major,
        role_id:role_id,
        lou_id:lou_id,
        room_id:room_id,
        status:status
    })
    user.save((err) => {
        if(err) return console.log(err)
        console.log("插入user成功")
    })
}

//修改密码
function changePwd(username, password) {
    UserModel.updateOne({"username":username},{"password":password},(err) => {
        if(err) return console.log(err)
        console.log("修改密码成功！")
    })
}


module.exports = {UserModel,addUser,changePwd}