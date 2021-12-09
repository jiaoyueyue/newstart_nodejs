/**
 *  @file 一个简单的静态文件合并服务器——性能改进
 *  1. 只读数据流简化代码
 *  2. 在检查请求的所有文件是否有效之后, 立即输出响应头, 并接着一边按顺序读取文件一边输出响应内容
 */

import paresURL from '../utils/index.js';

const fs = require('fs');
const http = require('http');

function main(argv) {
    const config = JSON.parse(fs.readFileSync(argv[0], 'utf-8'));
    const root = config.root || '';
    const port = config.port || 80;

    http.createServer(function(request, response) {
        const urlInfo = paresURL(root, request.url);

        validateFiles(urlInfo.pathnames, function(err, pathnames) {
            if (err) {
                response.writeHead(404);
                response.end(err.message);
            } else {
                response.writeHead(200, {
                    'Content-Type' : urlInfo.mime
                });
                outputFiles(pathnames, response);
            }
        })
    }).listen(port);
}

function validateFiles(pathnames, callback) {
    (function next(i, len) {
        if (i < len) {
            fs.stat(pathnames[i], function(err, stats) {
                if (err) {
                    callback(err);
                } else if (!stats.isFile()) {
                    callback(new Error());
                } else {
                    next(i + 1, len);
                }
            });
        } else {
            callback(null, pathnames);
        }
    }(0, pathnames.length));
}

function outputFiles(pathnames, writer) {
    (function next(i, len) {
        if (i < len) {
            const reader = fs.createReadStream(pathnames[i]);

            reader.pipe(writer, {end: false});
            reader.on('end', function() {
                next(i + 1, len);
            });
        } else {
            writer.end();
        }
    }(0, pathnames.length));
}

main(process.argv.slice(2));