// 使用Nodejs内置的http模块简单实现一个http服务器
// 创建一个Http服务器并监听8214端口, 打开浏览器访问该端口http://127.0.0.1:8214/

const http = require('http');

http.createServer(function(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text-plain'
    });
    response.end('Hello world\n');
}).listen(8214);

/**
 * http模块提供两种使用方式:
 * 1. 作为服务端使用时, 创建一个Http服务器, 监听HTTP客户端请求并返回响应
 * 2. 作为客户端使用时, 发起一个HTTP客户端请求, 获取服务端响应
 */

/**
 * 服务端模式下如何工作的
 *     首先需要使用.createSever方法创建一个服务器, 然后调用.listen方法监听端口. 之后, 
 * 每当来了一个客户端请求, 创建服务器时传入的回调函数就被调用一次, 可以看出, 这是一种事件机制
 */

// HTTP请求本质上是一个数据流, 由请求头(headers)和请求体(body)组成.
// HTTP请求在发送给服务器时, 可以认为是按照从头到尾的顺序一个字节一个字节地以数据流方式发送的.
// 而http模块创建的HTTP服务器在接收到完整的请求头后, 就会调用回调函数. 
// 在回调函数中, 除了可以使用request对象访问请求头数据外, 还能把request对象当作一个只读数据流来访问请求体数据

http.createServer(function(request, response) {
    const body = [];
    console.log(request.method);
    console.log(request.headers);

    request.on('data', function(chunk) {
        body.push(chunk);
    });

    request.on('end', function() {
        body = Buffer.concat(body);
        console.log(body.toString());
    })
}).listen(80);

// 在回调函数中, 除了可以使用response对象来写入响应头数据外, 还能把response对象当作一个只写数据流来写入响应体数据
// 以下例子中, 服务端原样将客户端请求的请求体数据返回给客户端
http.createServer(function(request, response) {
    response.writeHead(200, {
        'Conten-type': 'text/plain'
    });

    request.on('data', function(chunk) {
        response.write(chunk);
    });

    request.on('end', function() {
        response.end();
    })
}).listen(4444);


/**
 * 客户端模式
 *     为了发起一个客户端HTTP请求, 我们需要指定目标服务器的位置并发送请求头和请求体
 *     1. .request方法创建一个客户端, 并指定请求目标和请求头数据.
 *     2. 之后就可以把request对象当作一个只写数据流来写入请求体数据和结束请求
 * 
 */
const options = {
    hostname: 'www.example.com',
    port: 5555,
    path: '/upload',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

const request = http.request(options, function(response) {});
request.write('hello world');
request.end();

// 由于HTTP请求中的GET请求是最常见的一种, 并且不需要请求体, 因此http模块也提供了以下便捷API
// 当客户端发送请求并接收到完整的服务端响应头时, 就会调用回调函数.
// 在回调函数中, 除了可以使用response对象访问响应头数据外, 还能把response对象当作一个只读数据流来访问响应体数据

http.get('http://www.example.com/', function(response){
    const body = [];

    console.log(response.statusCode);
    console.log(response.headers);

    response.on('data', function(chunk) {
        body.push(chunk);
    })

    response.on('end', function() {
        body = Buffer.concat(body);
        console.log(body.toString());
    })
});




// 官方文档： http://nodejs.org/api/http.html