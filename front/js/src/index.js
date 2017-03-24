'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import catch_render_error from './module/catch_error';
// import {Router, Route, Link, browserHistory,IndexRoute,hashHistory} from 'react-router';

import TopHeader from './module/top-head.js';
import ContentHeader from './module/content-header.js';
import ContentSection from './module/content-section';
import Footer from './module/footer';
import FunSection from './module/fun-section';
import BoringSection from './module/boring-section';
import EncySection from './module/ency-section';
import ShopSection from './module/shop-section';
import GameSection from './module/game-section';
import VideoSection from './module/video-section';
import Float_left from './module/float-left.js';
import FloatRight from './module/float-right.js';
import MoveSection from './module/move-section';
@catch_render_error
class MainPage extends React.Component{

    render(){
      return(
        <div>
            <TopHeader />
            <Float_left />
            <section className="center-section">
                <ContentHeader />
                <ContentSection />
                <MoveSection />
            </section>
            <Footer />
            <FloatRight />
        </div>
      )
    }

}


ReactDOM.render(
  <MainPage />,document.getElementById('app')
);
