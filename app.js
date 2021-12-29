const express = require('express');
const ejs = require('ejs')
const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded


//使用ejs模板引擎   默认找views这个目录
app.set('view engine','ejs');

//配置public目录为我们的静态资源目录
app.use(express.static('public'));

app.use(express.static('node_modules'));

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
app.post('/LoginAction',(req,res) =>{
    res.render('login.ejs',{
        username:req.body.username,
        info:"登陆成功！"
    })
})










app.listen(10317, (req,res) =>{
    console.log("服务器已启动")
})