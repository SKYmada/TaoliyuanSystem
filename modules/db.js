const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/190110910317',(err) =>{
    if(err){
        console.log(err);
        return;
    }
    console.log('数据库连接成功');
});

module.exports = mongoose;