'use strict'

let url_prefix = "http://123.benhu.com/api/";

var search_top_news = url_prefix + 'search_top_news';

var sina_weather_url = url_prefix + 'get_weather';

let site_links_json = "/json/site-links.json";

let addon_links_json = "/json/addon-links.json";

let guess_prefer_json = "/json/guess-perfer.json";

let other_links_json = "/json/other-links.json";

let tool_links_json  = "/json/tool-links.json";

let fun_section_json = "/json/fun-section.json";

let left_daily_news_json = "/json/left-daily-news.json";

let left_video_news_json = "/json/video-news.json";

let floatleft_links_json = "/json/float-left.json";

let boring_section_json = "/json/boring-section.json";

let ency_section_json = "/json/ency-section.json";

let shop_section_json = "/json/shop-section.json";

let content_header_json = "/json/content-header.json";

let game_section_json = "/json/game-section.json";

let video_section_json = "/json/video-section.json";

let life_news_json = "/json/life-news.json";

let shop_news_json = "/json/shop-news.json";

let game_news_json = "/json/game-news.json";

let head_news_json = "/json/head-news.json";


function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

export {
    search_top_news,
    content_header_json,
    sina_weather_url,
    site_links_json,
    addon_links_json,
    guess_prefer_json,
    other_links_json,
    tool_links_json,
    fun_section_json,
    left_daily_news_json,
    left_video_news_json,
    boring_section_json,
    ency_section_json,
    shop_section_json,
    game_section_json,
    video_section_json,
    life_news_json,
    shop_news_json,
    game_news_json,
    head_news_json,
    getDocHeight,
    floatleft_links_json
};
