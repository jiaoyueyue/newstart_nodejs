// Process官方文档： http://nodejs.org/api/process.html

// 任何一个进程都有启动进程时使用的命令参数, 有标准输入标准输出, 有运行权限, 有运行环境和运行状态.
// 在NodeJS中,可以通过process对象感知和控制NodeJS自身进程的方方面面
// process不是内置模块, 而是一个全局对象, 因此在任何地方都可以直接使用

/**
 * Child Process
 * 官方文档： http://nodejs.org/api/child_process.html
 * 使用child_process模块可以创建和控制子进程
 * 该模块提供的API中最核心的是.spawn, 其余API都是针对特定使用场景对它的进一步封装, 算是一种语法糖
 */

/**
 * Cluster
 * 官方文档： http://nodejs.org/api/cluster.html
 * cluster模块是对child_process模块的进一步封装, 专用于解决单进程NodeJS Web服务器无法充分利用多核CPU的问题
 * 使用该模块可以简化多进程服务器程序的开发, 让每个核上运行一个工作进程, 并统一通过主进程监听端口和分发请求.
 */



/**
 * 如何获取命令行参数
 * 在NodeJs中可以通过process.argv获取命令行参数.
 * node执行程序路径和主模块文件路径固定占据了argv[0]和argv[1]两个位置
 * 第一个命令行参数从argv[2]开始, 为了让argv使用起来更加自然, 可以按照以下方式处理:
 */
function main(argv) {}
main(process.argv.slice(2));


/**
 * 如何退出程序
 * 通常一个程序做完所有事情后就正常退出了, 这时程序的退出状态吗为0
 * 一个程序运行时发生了异常后就挂了, 这时程序的退出状态码不等于0
 * 如果我们在代码中捕获了某个异常, 但是觉得程序不应该继续运行下去, 需要立即退出, 并且需要把退出状态码设置为制定数字, 比如1, 可以按照以下方式:
 */
try {

} catch (err) {
    process.exit(1);
}


/**
 * 如何控制输入输出
 * NodeJS程序的标准输入流(stdin)、标准输出流(stdout)、标准错误流(stderr)分别对应process.stdin、process.stdout和process.strerr
 * 第一个是只读数据流, 后边两个是只写数据流
 * 
 */
function log() {
    process.stdout.write(
        util.format.apply(util, arguments) + '\n'
    )
}


/**
 * 如何降权
 * 在Linux系统下, 我们知道需要使用root权限才能监听1024以下端口.
 * 完成端口监听后, 继续让程序运行在root权限下存在安全隐患, 因此最好能把权限降下来.
 */

const http = require('http');
http.createServer(callback).listen(80, function() {
    const env = process.env;
    const uid = parseInt(env['SUDO_UID'] || process.getuid(), 10);
    const gid = parseInt(env['SUDO_GID'] || process.getgid(), 10);

    process.setgid(gid);
    process.setuid(uid);
});
/**
 * 1. 如果是通过sudo获取root权限的, 运行程序的用户的UID和GID保存在环境变量SUDO_DUID和SUDO_GID中
 * 2. 如果是通过chmod +s方式获取root权限的, 运行程序的用户的UID和GID可直接通过process.getuid和processgetgid方法获取
 * 3. process.setuid和process.setgid方法只接受number类型的参数
 * 4. 降权时必须先降GID再降UID, 否则顺序反过来的话就没权限更改程序的GID了
 */



/**
 * 如何创建子进程
 * 1. .spawn(exec, argsm options)方法, 该方法支持三个参数
 *    第一个是执行文件路径, 可以是执行文件的相对或绝对路径, 也可以是根据PATH环境变量能找到的执行文件路径
 *    第二个参数中, 数组种的每个成员都按顺序对应一个命令行参数
 *    第三个参数可选, 用于配置子进程的执行环境与行为
 * 2. 以下示例虽然通过子进程对象的.sddout和.stderr访问子进程的输出,
 *    但通过options.stdio字段的不同配置, 可以将子进程的输入输出重定向到任何数据流上, 或者让子进程共享父进程的标准输入输出流,
 *    或者直接忽略子进程的输入输出
 */
const child_process = require('child_process');
const child = child_process.spwan('node', 'xxx.js');

child.stdout.on('data', function(data) {
    console.log('stdout' + data);
});

child.stderr.on('data', function(data) {
    console.log('stderr' + data);
})

child.on('close', function(code) {
    console.log('child process exited with code' + code);
})



/**
 * 进程间如何通讯
 * 1. 父进程通过.kill方法向子进程发送SIGTERM信号, 子进程监听process对象的SIGTERM事件响应信号
 * 2. 不要被kill的名称迷惑, 该方法本质上使用来给进程发送信号的
 * 3. 进程接受到信号后具体要做什么, 完全取决于信号的种类和进程自身的代码
 */

// parent.js
const child = child_process.spwan('node', ['child.js']);
child.kill('SIGTERM');

// child.js
process.on('SIGTERM', function() {
    cleanUp();
    process.exit(0);
})


// 如果父子进程都是NodeJs进程, 可以通过IPC(进程间通讯)双向传递数据
const child01 = child_process.spwan('node', ['child.js'], {
    stdio: [0, 1, 2, 'ipc']
});
child01.on('message', function(msg) {
    console.log(msg);
});
child01.send({hello: 'hello'});

// child.js
process.on('message', function(msg) {
    msg.hello = msg.hello.toUpperCase();
    process.send(msg);
});
/**
 * 1. 父进程在创建子进程时, 在options.stdio字段中通过ipc开启了一条IPC通道, 之后就可以监听子进程对象的message⌚️来接收子进程的消息, 并通过.send方法给子进程发送消息
 * 2. 在子进程中, 可以在process对象上监听message事件接受来自父进程的消息, 并通过.send方法向父进程发送消息
 * 3. 数据在传递的过程中, 会先在发送端使用JSON.stringify方法序列话, 再在接收端使用JSON.parse方法反序列化
 */



/**
 * 如何守护子进程
 * 守护进程一般用户监控工作进程的运行状态, 在工作进程不正常退出时重启工作进程, 保障工作进程不间断运行
 */
function spwan(mainModule) {
    const worker = child_process.spwan('node', [mainModule]);
    worker.on('exit', function(code) {
        if (code !== 0) {
            spwan(mainModule);
        }
    })
}

spwan('worker.js');