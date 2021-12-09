/**
 * @file 简单爬虫
 * superagent(http://visionmedia.github.io/superagent/ ) 是一个http方面的库, 可以发起get或post请求
 * cheerio(https://github.com/cheeriojs/cheerio ), 可以理解成Node.js版的jquery, 用来从网页中以css selector取数据, 使用方式和jquery一样
 */

const express = require('express');
const superagent = require('superagent');
const cheerio = require('cheerio');
const { next } = require('cheerio/lib/api/traversing');

const app = express();

app.get('/', function(req, res) {
    superagent.get('https://cnode.js.org').end(function(err, sres) {
        if (err) {
            return next(err);
        }

        // sres.text存储着网页的html内容, 将它传给cheerio.load之后就可以得到一个实现了jquery接口的变量
        const $ = cheerio.load(sres.text);
        const items = [];
        $('#topic_list .topic_title').each(function(idx, element) {
            const $element = $(element);
            items.push({
                title: $element.attr('title'),
                href: $element.attr('href')
            });
        });
        res.send(items);
    })
})

app.listen(3000, function(req, res) {
    console.log('app is running at 3000 port')
})

