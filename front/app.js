'use strict';

let express  = require('express');
let path = require('path');
let app = express();

var fs = require("fs");


let json_path = path.join(__dirname, 'public/json/');

function get_json_string(json){
    return JSON.stringify(require(json_path + json ));
}

let static_jsons = [{name:'footer_json',data:get_json_string('footer.json')}];



app.use(express.static(path.join(__dirname, 'public')));



app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');

app.get('/', function (req, res) {
    let dicts = static_jsons;
    static_jsons.map(function(data,index){
        try{
            dicts[data.name] = data.data;
        }
        catch(e){
            console.error(e);
        }
    })
    res.render('index', dicts)
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
