const fs = require('fs');

// 使用fs.createReadStream创建一个源文件的只读数据流, 并使用fs.createWriteStream创建了一个目标文件的只写数据流
// 并且用pipe方法把两个数据流连接了起来; 连接后发生的事情, 有点像水顺着水管从一个桶流到了另一个桶.
function copy(src, dst) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function bigFileCopy(argv) {
    copy(arvg[0], argv[1]);
}

bigFileCopy(process.argv.slice(2));