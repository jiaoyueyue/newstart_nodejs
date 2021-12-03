// NodeJs通过fs内置模块提供对文件的操作. fs模块提供的API基本可以分为以下三类
/**
 * 1. 文件属性读写: fs.stat、fs.chmod、fs.chown
 * 2. 文件内容读写: fs.readFile、fs.readdir、fs.writeFile、fs.mkdir
 * 3. 底层文件操作: fs.open、fs.read、fs.write、fs.close
 */

// Nodejs最精华的异步IO模型在fs模块里有着充分的体现, 例如上边提到的这些API都通过回调函数传递结果. 以fs.readFile为例:
const fs = require('fs');
fs.readFile(pathname, function(err, data) {
    if (err) {

    } else {

    }
})

// 如上所示, 基本上所有的fs模块API的回调参数都有两个. 第一个参数在有错误发生时等于异常现象, 第二个参数始终用于返回API方法执行结果
// 此外, fs模块的所有异步API都有对应的同步版本, 用于无法使用异步操作时,或者同步操作更方便时的情况.
// 同步API除了方法名的末尾多了一个Sync外, 异常对象与执行结果的传递方式也有相应的变化:
try {
    const data = fs.readFileSync(pathname);
} catch (err) {
    console.log(err)
}




// 官方文档： http://nodejs.org/api/fs.html