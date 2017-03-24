

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import catch_render_error from './catch_error';

@catch_render_error
export default class SwitchLayout extends React.Component{

    render(){
        return(
            <div className="switch-layout">
                <div className="up-switch">
                    <div className="up-btn"></div>
                </div>
                <div className="down-switch">
                    <div className="down-btn"></div>
                </div>
            </div>
        )
    }
}
