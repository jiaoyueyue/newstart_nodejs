/**
 * @file 当在浏览器中访问http://localhost:3000/?q=alsotang时, 输出alsotang的md5值, 即 bdd5e57b5c0040f9dc23d430846e68a3
 */

const express = require('express');
const utility = require('utility');

const app = express();

app.get('/', function(req, res) {
    // 从req.query中取出q参数
    const q = req.query.q;
    const mad5Value = utility.md5(q);
    res.send(mad5Value);
});

app.listen(3000, function(req, res) {
    console.log('app is running at port 3000');
})