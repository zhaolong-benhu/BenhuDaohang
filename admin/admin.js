'use strict';

let express  = require('express');
let path = require('path');
let app = express();

var jsonfile = require('jsonfile');
var util = require('util');

var bodyParser = require('body-parser');

var fs = require('fs');


import  {
    site_links_json,
    addon_links_json,
    content_header_json,
    guess_prefer_json,
    other_links_json,
    tool_links_json,
    fun_section_json,
    boring_section_json,
    floatleft_links_json,
    ency_section_json,
    shop_section_json,
    game_section_json,
    video_section_json,
    life_news_json,
    shop_news_json,
    game_news_json,
    head_news_json,
    left_daily_news_json,
    left_video_news_json
} from './js/module/global';


let post_url = [
    {name:'links',url:site_links_json},
    {name:'addons',url:addon_links_json},
    {name:'leftaddons',url:floatleft_links_json},
    {name:'groups',url:guess_prefer_json},
    {name:'modules',url:other_links_json},
    {name:'modules',url:fun_section_json},
    {name:'modules',url:boring_section_json},
    {name:'modules',url:ency_section_json},
    {name:'modules',url:shop_section_json},
    {name:'modules',url:game_section_json},
    {name:'modules',url:video_section_json},
    {name:'modules',url:tool_links_json},
    {name:'modules',url:left_video_news_json},
    {name:'modules',url:life_news_json},
    {name:'modules',url:shop_news_json},
    {name:'modules',url:head_news_json},
    {name:'modules',url:game_news_json},
    {name:'data',url:content_header_json},
    {name:'data',url:left_daily_news_json}
  ]
app.use(bodyParser.json());



app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');

app.get('/', function (req, res) {
    res.render('index', {
     msg: 'test'
   })
});

app.get('/preview/', function (req, res) {
    res.render('preview', {
     msg: 'test'
   })
});

post_url.map(function(item){
    let name =item.name;
    app.post(item.url,function(req,res){
        let file =path.join(__dirname, 'public' + item.url);
        let obj = {};
        if(name == null)
        {
            obj = req.body.json;
        }
        else{
            obj[item.name] = req.body.json;
        }

        console.log('-----save-----    ' + item.url);
        jsonfile.writeFile(file, obj, function (err) {
            if(err)
            {
                console.error(err)
            }
        })
        res.json({ code:0 });
    })
});

app.post('/deploy',function(req,res){

    var date = new Date();
    let file =path.join(__dirname, 'public' + req.body.json);

    let destFile = '../front/public/' + req.body.json;

    let destFile_bak = '../front/public/' + req.body.json + date.getTime();

    fs.writeFileSync(destFile_bak, fs.readFileSync(destFile));
    // fs.createReadStream(destFile).pipe(fs.createWriteStream(destFile_bak));
    fs.createReadStream(file).pipe(fs.createWriteStream(destFile));


    res.json({ code:0 });
})


app.use(express.static(path.join(__dirname, 'public')));



var server = app.listen(3002, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
