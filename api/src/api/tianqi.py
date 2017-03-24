import requests
from flask import request
from flask.ext.cors import cross_origin

from . import api

key = '83b95efef57e576a5638a443c18acbc5'


@api.route('/get_weather')
@cross_origin()
def get_weather():
    if request.headers.getlist("X-Forwarded-For"):
        ip = request.headers.getlist("X-Forwarded-For")[0]
    else:
        ip = request.remote_addr
    url = "http://int.dpool.sina.com.cn/iplookup/iplookup.php?ip=" + ip
    u = requests.get(url=url)

    txt = u.text
    if txt != "-2":
        array = str(txt).split()
        location = array[len(array) - 1]

        url = 'http://apis.baidu.com/heweather/weather/free?city=%s' % location

        u = requests.get(url=url, headers={'apikey': key})
        return u.content
    return ""
