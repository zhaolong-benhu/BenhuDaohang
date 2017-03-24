'use strict'


import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory,hashHistory,IndexRoute} from 'react-router';

import PreviewPage from './module/preview';
import SiteLinks from './module/site-links';
import AddonLinks from './module/addon-links';
import FloatLeftLinks from './module/float-left';
import GuessPrefer from './module/guess-like';
import OtherLinks from './module/other-links';
import FunSection from './module/fun-section';
import BoringSection from './module/boring-section';
import EncySection from './module/ency-section';
import ShopSection from './module/shop-section';
import GameSection from './module/game-section';
import VideoSection from './module/video-section';
import LifeNews from './module/life-news';
import ShopNews from './module/shop-news';
import GameNews from './module/game-news';
import HeadNews from './module/head-news';
import ToolLinks from './module/tool-links';
import Deploy from './module/deploy';

import LeftDailyNews from './module/left-daily-news';
import LeftVideoNews from './module/video-news';
import ContentHeader from './module/content-header';

import App from './module/common';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={PreviewPage}/>
            <Route path="/preview" component={PreviewPage}/>
            <Route path="/site-link" component={SiteLinks}/>
            <Route path="/addon-link" component={AddonLinks}/>
            <Route path="/float-left" component={FloatLeftLinks}/>
            <Route path="/guess-like" component={GuessPrefer}/>
            <Route path="/other-link" component={OtherLinks}/>
            <Route path="/fun-section" component={FunSection}/>
            <Route path="/boring-section" component={BoringSection}/>
            <Route path="/tool-link" component={ToolLinks}/>
            <Route path="/left-daily" component={LeftDailyNews}/>
            <Route path="/video-news" component={LeftVideoNews}/>
            <Route path="/ency-section" component={EncySection}/>
            <Route path="/shop-section" component={ShopSection}/>
            <Route path="/game-section" component={GameSection}/>
            <Route path="/video-section" component={VideoSection}/>
            <Route path="/life-news" component={LifeNews}/>
            <Route path="/shop-news" component={ShopNews}/>
            <Route path="/game-news" component={GameNews}/>
            <Route path="/head-news" component={HeadNews}/>
            <Route path="/content-header" component={ContentHeader}/>
            <Route path="/deploy" component={Deploy}/>
        </Route>

    </Router>
), document.getElementById('app'));
