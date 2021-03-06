const UserModel = require("./User")
const LouModel = require("./Lou")
const ApplyModel = require("./Apply")

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

//在lous表中插入数据
function addLou(lou_id, name, build_time, remake) {
    var Lou = new LouModel({
        lou_id:lou_id,
        name:name,
        build_time:build_time,
        remake:remake,
    })
    Lou.save((err) => {
        if(err) return console.log(err)
        console.log("插入lou成功")
    })
}
//更新楼层数据
function updateLou(apply_lou_id){
    LouModel.findOne({"lou_id":apply_lou_id},(err,data)=>{
        if(err) return console.log(err)
        LouModel.updateOne({"lou_id":data.lou_id},{"person_num":data.person_num+1},(err)=>{
            if(err) return console.log(err)
            console.log("更新楼层数据成功！！")
        })
    })
}

//提交申请
function addApply(applicant,apply_time,apply_lou_id,apply_room_id){
    var apply = new ApplyModel({
        applicant:applicant,
        apply_time:apply_time,
        apply_lou_id:apply_lou_id,
        apply_room_id:apply_room_id,
    })
    apply.save((err) => {
        if(err) return console.log(err)
        console.log("插入apply成功")
    })
}


// -------------处理申请-------------------
// 同意
function Agree(applicant){
    ApplyModel.updateOne({"applicant":applicant},{"status":1},(err) =>{
        if(err) return console.log(err)
        console.log("已同意申请！")
    })
    ApplyModel.findOne({"applicant":applicant},(err,data) =>{
        UserModel.updateOne({"username":applicant},{"lou_id":data.apply_lou_id,"room_id":data.apply_room_id},(err) =>{
            console.log("学生信息已更新！！！");
        })
        updateLou(data.apply_lou_id);
    })
}

// 拒绝
function Disagree(applicant){
    ApplyModel.updateOne({"applicant":applicant},{"status":-1},(err) =>{
        if(err) return console.log(err)
        console.log("已拒绝申请！")
    })

}

//修改密码
function changePwd(username, password) {
    UserModel.updateOne({"username":username},{"password":password},(err) => {
        if(err) return console.log(err)
        console.log("修改密码成功！")
    })
}


// 注销用户  根据用户id
function InvalidUser(username){
    UserModel.updateOne({"username":username},{"status":0},(err) =>{
        if(err) return console.log(err)
        console.log("注销成功！")
    })

    // UserModel.findOne({"id":id}, (err,data)=>{
    //     console.log("查询的id"+data.id)
    // })
}

// 恢复用户
function RestroUser(username){
    UserModel.updateOne({"username":username},{"status":1},(err) =>{
        if(err) return console.log(err)
        console.log("恢复成功！")
    })

}

module.exports = {UserModel,LouModel,ApplyModel,addUser,addLou,changePwd,RestroUser,InvalidUser,addApply,updateLou,Agree,Disagree}