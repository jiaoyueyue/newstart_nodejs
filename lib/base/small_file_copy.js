const fs = require('fs');


/**
 * @function 拷贝文件
 * @param {string} src 源文件路径
 * @param {string} dst 目标路径
 * 使用fs.readFileSync从源文件读取文件内容, 并使用fs.writeFileSync将文件内容写入目标路径
 */
function copy(src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src));
}

function smallFileCopy(argv) {
    copy(argv[0], argv[1]);
}

// process是一个全局变量, 可以通过process.argv获取命令行参数.
// 由于argv[0]固定等于NodeJs执行程序的绝对路径, argv[1]固定等于主模块的绝对路径, 因此第一个命令行参数从argv[2]这个位置开始
smallFileCopy(process.argv.slice(2));