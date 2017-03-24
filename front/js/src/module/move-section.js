'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import catch_render_error from './catch_error';

import FunSection from './fun-section';
import BoringSection from './boring-section';
import EncySection from './ency-section';
import ShopSection from './shop-section';
import GameSection from './game-section';
import VideoSection from './video-section';

@catch_render_error
export default class MoveSection extends React.Component{

    render(){
        return(
            <div className='move-section'>
              <div className="move-content">
                <VideoSection />
                <GameSection />
                <ShopSection />
                <EncySection />
                <BoringSection />
                <FunSection />
              </div>
            </div>
        )
    }
}
