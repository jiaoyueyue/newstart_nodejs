// 官方文档： http://nodejs.org/api/zlib.html

// zlib模块提供了数据压缩和解压的功能, 当我们处理HTTP请求和响应时, 可能需要用到这个模块

// 示例: 判断客户端是否支持gzip, 并在支持的情况下使用zlib模块返回gzip之后的响应体数据
const http = require('http');
const zlib = require('zlib');
http.createServer(function(request, response) {
    let i = 1024;
    let data = '';

    while(i--) {
        data += '.';
    }
    if ((request.headers['accept-encoding'] || '').indexOf('gzip') !== -1) {
        zlib.gzip(data, function(err, data) {
            response.writeHead(200, {
                'Content-Type': 'text/plain',
                'Content-Encoding': 'gzip'
            });
            response.end(data);
        });
    } else {
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        response.end(data);
    }
}).listen(80);


// 示例: 使用zlib模块解压HTTP响应体数据,判断服务器响应是否使用gzip压缩, 并在压缩的情况下使用zlib模块解压响应体数据
const options = {
    hostname: 'www.example.com',
    port: 90,
    path: '/',
    method: 'GET',
    headers: {
        'Accept-Encoding': 'gzip, deflate'
    }
};

http.request(options, function(response) {
    const body = [];

    response.on('data', function(chunk) {
        body.push(chunk);
    })

    response.on('end', function() {
        body = Buffer.concat(body);

        if (response.headers['content-encoding'] === 'gzip') {
            zlib.gunzip(body, function(err, data) {
                console.log(data.toString());
            })
        } else {
            console.log(data.toString());
        }
    });

}).end();