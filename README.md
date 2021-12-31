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



二、使用说明书

#### 1.进入系统: 输入ip：172.21.2.236:20317   进行访问![image-20211231172337827](image-20211231172337827.png)

#### 2.管理员登陆： 用户名密码均为“admin”进入

![image-20211231172357106](image-20211231172357106.png)

![image-20211231172409579](image-20211231172409579.png)



#### 3.管理员操作：

##### 	1）添加楼层：![image-20211231172543420](image-20211231172543420.png)

![image-20211231172555514](image-20211231172555514.png)

每个楼号与楼名只能使用一次，重复添加就会提示该楼已存在，添加几个数据后查看楼层信息![image-20211231173052552](image-20211231173052552.png)



#### 4.学生注册

![image-20211231174146654](image-20211231174146654.png)

![image-20211231174206786](image-20211231174206786.png)

![image-20211231174216261](image-20211231174216261.png)

#### 5.多注册几个数据，管理员查看![image-20211231174523500](image-20211231174523500.png)



#### 6.学生申请住宿![image-20211231174253588](image-20211231174253588.png)

![image-20211231174552944](image-20211231174552944.png)

重复提交申请会提示，已有提交记录，请勿重复提交

#### 7.管理员查看并处理申请：![image-20211231174806669](image-20211231174806669.png)

![image-20211231174825065](image-20211231174825065.png)



处理后，楼层和学生的信息进行相应的更新![image-20211231174907501](image-20211231174907501.png)

![image-20211231174917963](image-20211231174917963.png)



#### 8.学生查看寝室信息，未入住则没有信息![image-20211231175027564](image-20211231175027564.png)

123用户的申请还未处理，故没有信息

![image-20211231175044462](image-20211231175044462.png)



#### 9.管理员注销用户，失效的用户无法登陆![image-20211231175244570](image-20211231175244570.png)

333已注销：![image-20211231175318224](image-20211231175318224.png)

![image-20211231175326672](image-20211231175326672.png)



#### 10.修改密码

点击导航栏上的用户名，会弹出下拉菜单，点击修改密码进入修改页面：![image-20211231175439994](image-20211231175439994.png)

![image-20211231175449730](image-20211231175449730.png)

将用户123的密码改为321

修改完成后会提示重新登陆![image-20211231175539411](image-20211231175539411.png)

重新输入用户名和新密码即可登陆![image-20211231175607492](image-20211231175607492.png)



#### 11.登出（退出）

同样点击导航栏，选择登出，即可退出当前账户![image-20211231175719238](image-20211231175719238.png)





## 三、开发日记

![image-20211231175902881](image-20211231175902881.png)

![image-20211231175919487](image-20211231175919487.png)