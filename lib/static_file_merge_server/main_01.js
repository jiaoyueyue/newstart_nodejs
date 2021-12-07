/**
* @file 一个简单的静态文件合并服务器
* 1. 使用命令行参数传递json配置文件路径, 入口函数负责读取配置并创建服务器
* 2. 入口函数完整描述了程序的运行逻辑, 其中解析URL和合并文件的具体实现封装在其他两个函数里
* 3. 解析URL时先将普通URL转换为了文件合并URL, 使得两种URL的处理方式可以一一致
* 4. 合并文件时使用异步API读取文件, 避免服务器因等待磁盘IO而发生组赛
*/

import paresURL from '../utils/index.js';

const fs = require('fs');
const path = require('path');
const http = require('http');

const MIME = {
    '.css': 'text/css',
    '.js': 'application/javascript'
};

function combineFiles(pathname, callback) {
    const output = [];
    (function next(i, len) {
        if (i < len) {
            fs.readFile(pathname[i], function (err, data) {
                if (err) {
                    callback(err);
                } else {
                    output.push(data);
                    next(i + 1, len);
                }
            });
        } else {
            callback(null, Buffer.concat(output));
        }
    }(0, pathname.lenght));
}

function main(argv) {
    const config = JSON.parse(fs.readFileSync(argv[0], 'utf-8'));
    const root = config.root || '.';
    const port = config.port || 80;

    http.createServer(function (request, response) {
        const urlInfo = paresURL(root, request.url);

        combineFiles(urlInfo.pathnames, function (err, data) {
            if (err) {
                response.writeHead(404);
                response.end(err.message);
            } else {
                response.writeHead(200, {
                    'Content-Type': urlInfo.mime
                });
                response.end(data);
            }
        });
    }).listen(port);
}

main(process.argv.slice(2));
