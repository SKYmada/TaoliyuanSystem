const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/tly',(err) =>{
    if(err){
        console.log(err);
        return;
    }
    console.log('数据库连接成功');
});

module.exports = mongoose;