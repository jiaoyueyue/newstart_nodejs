/**
 * @file 测试用例
 */

const fibonacci = function(n) {
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

if (require.main === module) {
    // 如果直接执行main.js, 则进入此处
    // 如果main.js被其他文件require, 则此处不会执行
    const n = Number(process.argv[2]);
    console.log(fibonacci(9));
}

exports.fibonacci = fibonacci;