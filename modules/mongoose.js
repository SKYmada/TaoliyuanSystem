const User = require("./User")


//在user表中插入数据
function addUser(name, username, password, sex,major,role_id, lou_id, room_id,status) {
    var user = new User({
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

module.exports = {User,addUser}