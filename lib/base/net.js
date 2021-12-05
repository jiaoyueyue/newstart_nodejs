// 官方文档： http://nodejs.org/api/net.html


/**
 * net模块可用于创建Socket服务器或Socket客户端
 */
// 使用Socket搭建一个很不严谨的HTTP服务器的例子, http服务器不管接受什么请求, 都固定返回相同的响应
const net = require('net');
net.createServer(function(conn) {
    conn.on('data', function(data) {
        conn.write([
            'HTTP/1.1 200 ok',
            'Content-Type: text/plain',
            'Content-Length: 11',
            '',
            'Hello World'
        ].join('\n'));
    });
}).listen(80);


// 使用Socket发起HTTP客户端请求的, Socket客户端在建立连接后发送了一个HTTP GET请求, 并通过data事件监听函数来获取服务器响应
const options = {
    port: 8002,
    host: 'www.example.com'
};

const client = net.connect(options, function() {
    client.write([
        'GET / HTTP/1.1',
        'User-Agent: curl/7.26.0',
        'Host: www.baidu.com',
        'Accept: */*',
        '',
        ''
    ].join('\n'));
});

client.on('data', function(data) {
    console.log(data.toString());
    client.end();
})