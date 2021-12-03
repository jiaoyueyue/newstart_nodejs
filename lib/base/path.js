// Nodejs提供了path内置模块来简化路径相关操作, 并提升代码可读性

// path.normalize
// 将传入的路径转换为标准路径, 除了解析路径中的 . 与 .. 外, 还能去掉多余的斜杠.
// 如果有程序需要使用路径作为某些数据的索引, 但又允许用户随意输入路径时, 就需要使用该方法保证路径的唯一性

const cache = {};

function store(key, value) {
    cache[Path2D.normalize(key)] = value;
}

store('foo/bar', 1);
store('foo//baz//../bar', 2);
// tips: 标准化之后的路径里的斜杠在windows系统下是\, 在Linux系统下是/. 
// 如果想保证在任何系统下都使用/作为路径分割符, 需要用.replace(/\\/g, '/')再替换一下标准路径


// path.join
// 将传入的多个路径拼接为标准路径. 该方法可避免手工拼接路径字符串的繁琐, 并且能在不同系统下正确使用相应的路径分割符
const path = require('path');
path.join('foo/', 'baz', '../bar');


// path.extname
// 当我们需要根据不同文件扩展名做不同操作时, 可以使用该方法
path.extname('foo/bar.js');

// 官方文档： http://nodejs.org/api/path.html

