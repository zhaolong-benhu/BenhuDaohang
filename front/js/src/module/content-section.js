'use strict';

import React from 'react';

import DailyNews from './daily-news';

import LifeNews from './life-news';

import ShopNews from './shop-news';

import GameNews from './game-news';

import VideoNews from './video-news';

import HeadNews from './head-news';

import SiteLinks from './site-links';

import GuessPrefer from './guess-prefer';

import OhterLinks from './other-links';

import catch_render_error from './catch_error';

import LeftCommonNews from './left-common-news';

import ToolLinks from './tool-links';

@catch_render_error
export default class ContentSection extends React.Component{
    render(){
        return(
            <section className="center-content">
                <section className="left-content">
                    <DailyNews />
                    <HeadNews />
                    <VideoNews />
                    <GameNews />
                    <ShopNews />
                    <LifeNews />
                    <LeftCommonNews />
                </section>
                <section className="right-content">
                    <SiteLinks />
                    <GuessPrefer />
                    <OhterLinks />
                    <ToolLinks />
                </section>
            </section>
        )
    }
}
