/**
 * @file 当在浏览器中访问http://localhost:3000/时, 输出Hello World
 */

const express = require('express');

// 调用express实例, 它是一个函数, 不带参数调用时, 会返回一个express实例, 将这个变量赋予app变量
const app = express();

// app本身有很多方法, 其中包括最常用的get、post、put/patch、delete, 在这里我们调用其中的get方法, 为我们的‘/’路径指定一个handleer函数
// 这个handler函数会接受req和res两个对象, 他们分别是请求的request和response
// request中包含了浏览器传来的各种信息, 比如query, body、header等, 都可以通过req对象访问到
// res对象, 一般不从里面取信息, 而是通过它来定制服务器向浏览器输出的信息

app.get('/', function(req, res) {
    res.send('Hello World');
})

// 监听不本地端口, 回调函数会在listen动作成功后执行
app.listen(3000, function() {
    console.log('app is listening at port 3000');
})



/**
 * 端口
 * 端口的作用: 通过端口来区分出同一电脑内不同应用或者进程, 从而实现一条物理网线(通过分组交换技术——比如internet)同时链接多个程序
 * 端口号是一个16位的uint, 所以其范围为1到65535(对TCP来说, port0被保留, 不能被使用, 对于tcp来说, source端的端口号是可选的, 为0时表示无端口)
 */