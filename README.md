# 宿舍管理系统

## 一、项目设计

### 1.项目总体构成

#### 	这是一个学生宿舍管理系统，学生通过注册进入系统，然后申请宿舍进行入住，管理员只有一个admin，可以管理宿舍区的楼层，学生信息，处理学生的申请。

#### 

### 2.引入包说明

#### 	1）const express = require('express');  //前端框架

#### 	2）const Mongoose = require('./modules/mongoose.js'); //数据库操作封装

#### 	3）const bodyParser = require('body-parser')   //处理post提交的数据

#### 	4）const sd = require('silly-datetime');  //获取格式化日期

#### 	5）const session = require('express-session');  //保存用户信息

#### 	6）const ejs = require('ejs');  //渲染前端页面

### 3.项目文件结构：

#### 	1）modules：存放mongoose等对数据库操作的文件以及表的schema，查询修改方法。

#### 	2）node_modules:存放node的架包，其中添加了下载的bootstrap4.4.1样式包

#### 	3）public：存放图片等静态文件

#### 	4）views：存放前端页面。

#### 	5）app.js:主文件