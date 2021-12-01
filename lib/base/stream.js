// 当内存中无法一次装下需要处理的数据时, 或者一边读取一边处理更加高校时, 我们就需要用到数据流.
// Nodejs中通过各种Stream来提供对数据流的操作

// 以大文件拷贝为例: 
const fs = require('fs');
const rs = fs.createReadStream(pathname);
// rs.on('data', function(chunk) {
//     doSomething(chunk);
// });

// rs.on('end', function() {
//     cleanUp();
// })


// Stream基于事件机制工作, 所有Stream的实例都继承于NodeJs提供的EvenEmitter
// 上边的代码中data事件会源源不断地被触发, 不管doSomething函数是否处理的过来. 代码可做如下改造来解决这个问题: 
// rs.on('data', function(chunk) {
//     rs.pause();
//     doSomething(chunk, function() {
//         rs.resume();
//     });
// });

// rs.on('end', function() {
//     cleanUp();
// })


// 以上代码给doSomething函数加上了回调, 因此我们可以在处理数据前暂停数据读取, 并在处理数据后继续读取数据
// 此外, 我们可以为数据目标创建一个只写数据流: 
// const ws = fs.createWriteStream(dst);
// rs.on('data', function(chunk) {
//     ws.write(chunk);
// });

// rs.on('end', function() {
//     ws.end();
// });
// 把doSmoething换成了往只写数据流里写入数据后, 以上代码看起来就像是一个文件拷贝程序了.
// 但是以上代码存在如果写入速度跟不上读取速度的话, 只写数据流内部的缓存会爆仓.



// 我们可以根据.write方法返回值来判断传入的数据是写入目标了, 还是临时存放在了缓存了
// 并根据drain事件来判断什么时候只写数据流已经将缓存中的数据写入目标, 可以传入下一个待写数据了
rs.on('data', function(chunk) {
    if (ws.write(chunk) === false) {
        rs.pause();
    }
});

rs.on('end', function() {
    ws.end();
});

ws.on('drain', function() {
    rs.resume();
});
// 以上代码实现了数据从只读数据流到只写数据流的搬运, 并包括了防爆仓控制.
// 因为这种使用场景多, 例如大文件拷贝程序, NodeJs直接提供.pipe方法来做这件事情, 其内部实现方式与上边代码类似