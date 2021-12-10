/**
 * @file async 控制并发
 */

const async = require('async');

let concurrencyCount = 0;
function fetchUrl(url, callback) {
    const delay = parseInt((Math.random() * 10000000) % 2000, 10);
    concurrencyCount++;
    console.log('现在的并发数是', concurrencyCount);
    console.log('正在抓取的是', url + '  耗时:' + delay + '毫秒');
    setTimeout(function () {
        concurrencyCount--;
        callback(null, url, 'html content');
    }, delay);
};

const urls = [];
for (let i = 0; i < 30; i++) {
    urls.push('http://datasource_' + i);
}

async.mapLimit(urls, 5, function (url, callback) {
    fetchUrl(url, callback);
}, function (err, result) {
    console.log('final');
    console.log(result);
});