const express = require('express');
const app = express()

app.get('/',(req,res) => {
    res.send("服务器启动！")

})

app.listen(10317, (req,res) =>{
    console.log("服务器已启动")
})