/**
 * @file 并发请求
 */

const eventproxy = require('eventproxy');
const superagent = require('superagent');
const cherrio = require('cheerio');
const url = require('url');
const cnodeUrl = 'https://cnodejs.org/';

const ep = new eventproxy();

superagent.get(cnodeUrl).end(function(err, res) {
    if (err) {
        return console.error(err);
    }

    const topicUrls = [];
    const $ = cherrio.load(res.text);

    $('#topic_list .topic_title').each(function(idx, element) {
        const $element = $(element);
        const href = url.resolve(cnodeUrl, $element.attr('href'));
        topicUrls.push(href);
    });

    ep.after('topic_html', topicUrls.length, function(topics) {
        topics = topics.map(function(topicPair) {
            const topicUrl = topicPair[0];
            const topicHtml = topicPair[1];
            const $ = cherrio.load(topicHtml);
            return ({
                title: $('.topic_fuil_title').text().trim(),
                href: topicUrl,
                comment1: $('.replay_content').each(0).text().trim()
            });
        });
        console.log('final');
        console.log(topics);
    });
    
    topicUrls.forEach(topicUrl => {
        superagent.get(topicUrl).end(function(err, res) {
            console.log('fetch' + topicUrl + 'successful');
            ep.emit('topic_html', [topicUrl, res.text]);
        });
    });

});

