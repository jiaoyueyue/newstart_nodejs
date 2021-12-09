/**
 *  @file 一个简单的静态文件合并服务器——进程守护
 * 1. 利用NodeJs的进程管理机制, 将守护进程作为父进程
 * 2. 将服务器程序作为子程序
 * 3. 让父进程监控子进程的运行状态, 在其异常退出时重启进程
 */


const cp = require('child_process');
const http = require('http');
const fs = require('fs');

let worker;

function spawn(server, config) {
    worker = cp.spawn('node', [server, config]);
    worker.on('exit', function (code) {
        if (code !== 0) {
            spawn(server, config);
        }
    });
}


function main(argv) {
    const config = JSON.parse(fs.readFileSync(argv[0], 'utf-8'));
    const root = config.root || '';
    const port = config.port || 80;
    let server;

    server = http.createServer(function(request, response) {

    }).listen(port)


    process.on('SIGTERM', function() {
        server.close(function() {
            process.exit(0);
        })
    });
}

main(process.argv.slice(2));