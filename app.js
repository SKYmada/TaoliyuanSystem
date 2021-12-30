const express = require('express');
const Mongoose = require('./modules/mongoose.js');
const bodyParser = require('body-parser')
const session = require('express-session');  //保存用户信息
const ejs = require('ejs');
const { ConnectionStates } = require('mongoose');
const app = express();
// 配置中间件 固定格式
app.use(session({
    secret: 'keyboard cat', 
    resave: false, 
    saveUninitialized: true, 
    cookie: {
        maxAge: 1000 * 60 * 15
    },
    rolling: true
}))

// 解析post请求
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded


//使用ejs模板引擎   默认找views这个目录
app.set('view engine','ejs');

//配置public目录为我们的静态资源目录
app.use(express.static('public'));
app.use(express.static('node_modules'));

// // 登陆拦截，未登录不能访问其他功能  //使用失败
// let filter = (req,res,next) =>{
//     var path = req.url;
//     if(req.session.username == null){
//         res.render('login.ejs',{
//             username:null,
//             info:"请登陆"
//         })
//         // if(path != "/index.ejs" && path != "/login.ejs" && path != "/reg.ejs"){
//         //     res.render('/login.ejs',{
//         //         username:req.session.username,
//         //         info:"请先登陆！"
//         //     })
//         // }
//         // else next();
//     }
//     next();
// }
// app.use(filter);

//欢迎界面
app.get('/',(req,res) => {
    res.render('index.ejs')
})
app.get('/index.ejs',(req,res) => {
    res.render('index.ejs')
})


//登陆、注册界面
app.get('/login.ejs',(req,res) => {
    res.render('login.ejs',{
        username:null,
        info:null
    })
})
app.get('/reg.ejs',(req,res) => {
    res.render('reg.ejs',{
        username:null,
        info:null
    })
})

//用户登陆
app.post('/LoginAction',(req, res)=>{
    var username = req.body.username;
    var password = req.body.password;
    req.session.username=username;
    
    Mongoose.UserModel.findOne({"username": username, "password": password}).exec((err, user) => {
        if(err) return console.log(err)
        if(!user) res.render("login.ejs", {
            info: "用户名或密码错误",
            username:null
        })
        else {
            // 根据权限跳转页面
            if(user.role_id == 0)
            res.render("admin.ejs",{
                username:req.session.username
            })
            else{
                if(user.status ==0){
                    res.render("login.ejs", {
                        info: "该用户已失效",
                        username:null
                    })
                }else{
                    res.render("student.ejs",{
                        username:req.session.username
                    })
                }
            }
            //  console.log(user.status)  //获取权限
        }
    })
    

})


//登出
app.get('/LogoutAction',(req,res)=>{
    req.session.username = null
    res.render('login.ejs',{
        username:null,
        info:"登出成功"
    });
})


// 学生注册
app.post('/RegAction',(req,res) =>{

    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    var sex = req.body.sex;
    var major = req.body.major;
    // console.log(name,username,password,sex,major)
    Mongoose.UserModel.findOne({"username":username}).exec((err,user) =>{
        if(!user){
            Mongoose.addUser(name, username, password, sex, major)
            res.render("login.ejs", {
                username:null,
                info: "注册成功！请登录"
            })
        }else{
            res.render("reg.ejs", {
                username:null,
                info: "该用户名已被注册！"
            })
        }
        
    })

})

//管理员首页
app.get('/admin.ejs',(req,res)=>{
    res.render("admin.ejs",{
        username:req.session.username
    })
})


//管理员楼层管理
app.get('/list_lou.ejs',(req,res)=>{
    Mongoose.LouModel.find({},(err,data) =>{
        // console.log(data[0]);
        res.render('list_lou.ejs',{
            username:req.session.username,
            loulist:data,
        })
    }) 
})

//添加楼层页面
app.get('/admin_lou.ejs',(req,res)=>{
    res.render("admin_lou.ejs",{
        username:req.session.username,
        info:null
    })
})

//添加楼层
app.post('/AddLou',(req,res)=>{
    // res.send("获取到的楼层数据");
    // console.log(req.body)
    // var Lou = new Mongoose.LouModel({
    //     lou_id:req.body.lou_id,
    //     name:req.body.name,
    //     build_time:req.body.build_time,
    //     remake:req.body.remake,
    // })
    // Lou.save((err) => {
    //     if(err) return console.log(err)
    //     console.log("插入user成功")
    // })

    var lou = req.body;
    Mongoose.LouModel.findOne({"lou_id":lou.lou_id,}).exec((err,datas) =>{
        if(datas){  //查到id 该楼号存在
            res.render("admin_lou.ejs", {
                username:req.session.username,
                info: "该楼号已存在！！"
            })
            // Mongoose.addLou(lou.lou_id, lou.name, lou.build_time,lou.remake)
            // res.render("admin_lou.ejs", {
            //     username:req.session.username,
            //     info: "添加楼层成功！！"
            // })
        }
        else{  //查不到id查楼名
            Mongoose.LouModel.findOne({"name":lou.name,}).exec((err,datas)=>{
                if(datas){  //查到楼名
                    res.render("admin_lou.ejs", {
                        username:req.session.username,
                        info: "该楼名已存在！！"
                    })
                }
                else{  //楼号楼名都不重复，添加楼层
                    Mongoose.addLou(lou.lou_id, lou.name, lou.build_time,lou.remake)
                    res.render("admin_lou.ejs", {
                        username:req.session.username,
                        info: "添加楼层成功！！"
                    })
                }
            })


            // if(datas.lou_id == lou.lou_id){
            //     res.render("admin_lou.ejs", {
            //         username:req.session.username,
            //         info: "该楼号已存在！！"
            //     })
            // }

            // else if(datas.name == lou.name){
            //     res.render("admin_lou.ejs", {
            //         username:req.session.username,
            //         info: "该楼名已存在！！"
            //     })
            // }
        }
       
    })


})


//学生管理页
app.get('/admin_student.ejs',(req,res)=>{

    Mongoose.UserModel.find({"role_id":1},(err,data) =>{
        // console.log(data[0]);
        res.render('admin_student.ejs',{
            username:req.session.username,
            userlist:data,
        })
    })  
})

//注销、恢复用户
app.get('/RestroUser',(req,res) =>{
    // res.send(req.url);
    // 通过url获取用户用户名
    var action = req.url.split("?");
    var username = action[1].split("=")[1];
    // console.log(action);
    console.log("获取的username"+username);
    Mongoose.RestroUser(username);
    Mongoose.UserModel.find({"role_id":1},(err,data) =>{
        // console.log(data[0]);
        res.render('admin_student.ejs',{
            username:req.session.username,
            userlist:data,
        })
    })  
})

app.get('/InvalidUser',(req,res) =>{
    // res.send(req.url);
    // 通过url获取用户id
    var action = req.url.split("?");
    var username = action[1].split("=")[1];
    // console.log(action);
    console.log("获取的username"+username);
    Mongoose.InvalidUser(username);

    Mongoose.UserModel.find({"role_id":1},(err,data) =>{  //注销后刷新列表
        // console.log(data[0]);
        res.render('admin_student.ejs',{
            username:req.session.username,
            userlist:data,
        })
    })  
})







//学生首页
app.get('/student.ejs',(req,res)=>{
    res.render('student.ejs',{
        username:req.session.username
    })
})

//学生申请页面、
app.get('/student_apply.ejs',(req,res)=>{
    Mongoose.LouModel.find({},(err,data) =>{ //获取楼号供选择
        // console.log(data[0]);
        res.render('student_apply.ejs',{
            username:req.session.username,
            loulist:data,
            info:null,
        })
    }) 

    // res.render('student_apply.ejs',{
    //     username:req.session.username,
    //     info:null,
    // })
})


//学生提交申请
app.post('/doApply',(req,res)=>{
    // res.send(req.body)
    //获取数据
    var lou = req.body.apply_lou;
    var room = req.body.apply_room;
    
})












//修改密码页面
app.get('/changePwd.ejs',(req,res) =>{
    res.render('changePwd.ejs',{
        username:req.session.username,
        info:null
    })
})
// 修改密码
app.post('/changePwd',(req,res) => {
    var username = req.session.username;
    var newPwd1 = req.body.newPwd1;
    var newPwd2 = req.body.newPwd2;
    // console.log(oldPwd)
    // console.log(newPwd)
    // console.log(req.session.username)
    if(newPwd1 == newPwd2){
        Mongoose.UserModel.findOne({"username":username}, (err,data) => {
            if(err) return handleError(err);
            // console.log(data.username)
            // console.log(data.password)
            if(data.password == newPwd1){
                res.render('changePwd.ejs',{
                    username:req.session.username,
                    info:"新密码不能与旧密码相同！"
                })
            }
    
            else {
                Mongoose.changePwd(username,newPwd1);
                req.session.username =null;
                res.render('login.ejs',{
                    username:req.session.username,
                    info:"修改成功，请重新登陆！！"
                })
            }
        })
    }
    else{
        res.render('changePwd.ejs',{
            username:username,
            info:"两次输入的密码不一致！！"
        })
    }

    
        
    
})

app.listen(10317, (req,res) =>{
    console.log("服务器已启动")
})