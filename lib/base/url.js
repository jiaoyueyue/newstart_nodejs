// 官方文档： http://nodejs.org/api/url.html


// URL模块允许解析URL、生成URL、以及拼接URL
// 可以使用.parse方法来将一个URL字符串转换为URL对象

const url = require('url');
url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');


// 传给.parse方法的不一定要是一个完整的URL, 例如在HTTP服务器回调函数中, request.url不包含协议头和域名吗但同样可以用.parse方法解析
const http = require('http');
http.createServer(function(request, response) {
    const tmp = request.url;
    url.parse(tmp);
})


// .parse方法还支持第二个和第三个布尔类型可选参数
// 第二个参数等于true时, 该方法返回的URL对象中, query字段不再是一个字符串, 而是一个经过querystring模块转换后的参数对象
// 第三个参数等于true时, 该方法可以正确解析不带协议头的URL, 例如//www.example.com/foo/bar

// format方法允许将一个URL对象转换为URL字符串
url.format({
    protocol: 'http',
    host: 'www.example.com',
    pathname: '/p/a/t/h',
    search: 'query=string'
});

// .resolve方法可用于拼接URL

url.resolve('http://www.example.com/foo/bar', '../baz');
// http://www.example.com/bae



// 官方文档： http://nodejs.org/api/querystring.html

// querystring模块用于实现URL参数字符串与参数对象的互相转换
const querystring = require('querystring');
querystring.parse('foo=bar&baz=qux&baz=quux&corge');
querystring.stringify({
    foo: 'bar',
    baz: ['qux', 'quux'],
    corge: ''
});