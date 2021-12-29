const express = require('express');
const Mongoose = require('./modules/mongoose.js');
const session = require('express-session');  //保存用户信息
const ejs = require('ejs');
const app = express();

// 解析post请求
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded


//使用ejs模板引擎   默认找views这个目录
app.set('view engine','ejs');

//配置public目录为我们的静态资源目录
app.use(express.static('public'));
app.use(express.static('node_modules'));

// 配置中间件 固定格式
app.use(session({
    secret: 'keyboard cat', 
    username:"username",
    resave: false, 
    saveUninitialized: true, 
    cookie: {
        maxAge: 1000 * 60 * 15
    },
    rolling: true
}))

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

// 用户登陆
//用户登陆
app.post('/LoginAction',(req, res,next)=>{
    var username = req.body.username;
    var password = req.body.password;
    console.log(req.body)
    Mongoose.User.findOne({"username": username, "password": password}).exec((err, user) => {
        if(err) return console.log(err)
        if(!user) res.render("login.ejs", {
            info: "用户名或密码错误",
            user: null
        })
        else {
            res.send("登陆成功!")
        }
    })
    
})

// 学生注册
app.post('/RegAction',(req,res) =>{
    res.render('login.ejs',{
        username:null,
        info:"登陆成功,请登录！"
    })
})








app.listen(10317, (req,res) =>{
    console.log("服务器已启动")
})