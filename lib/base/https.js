//  https模块与http模块极为类似, 区别在于https模块需要额外的处理ssl证书

/**
 * 在服务端模式下
 *    与创建http服务器相比, 多了一个options对象, 通过key和cert字段指定了https服务器使用的私钥和公钥
 */

const https = require('https');

const fs = require('fs');
const { Server } = require('http');
const options = {
    key: fs.readFileSync('./ssl/default.key'),
    cert: fs.readFileSync('./ssl/default.cer')
}

const sever = https.createServer(options, function(request, response) {

})

// NodeJS支持SNI技术, 可以根据HTTPS客户端请求使用的域名动态使用不同的证书, 因此同一个HTTPS服务器可以使用多个域名提供服务

sever.addContext('foo.com', {
    key: fs.readFileSync('./ssl/foo.com.key'),
    cert: fs.readFileSync('./ss//foo.com.cer')
});

Server.addContext('bar.com', {
    key: fs.readFileSync('./ssl/bar.con.key'),
    cert: fs.readFileSync('./ssl/bar.con.cer')
})

/**
 * 在客户端模式下, 发起一个HTTPS客户端请求与http模块几乎相同
 */

const optionsHttps = {
    hostname: 'www.examole.com',
    port: 443,
    path: '/',
    method: 'GET'
}

const request = https.request(optionsHttps, function(response) {});
request.end();
// 如果目标服务器使用的SSL证书是自制的, 不是从颁发机构买的,默认情况下https模块会拒绝链接, 提示说有证书安全问题
// 在options里加入rejectUnauthorized: false字段可以禁用对证书有效性的检查, 从而允许https模块请求开发环境下使用自制证书的HTTPS服务器