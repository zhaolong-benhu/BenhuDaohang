from datetime import datetime

from flask.ext.cors import cross_origin

import requests

from . import api

class GlobalVars:
    top_news = {}


@api.route('/search_top_news')
@cross_origin()
def get_search_top_news():
    now = datetime.now().day
    if GlobalVars.top_news.get(now) is None:
        print('not get')
        r = requests.get(url='http://www.hao123.com/sugdata_s4.json')
        GlobalVars.top_news = {now: r.content}
    data = GlobalVars.top_news.get(now, "")
    return data
