'use strict';


import React from 'react';
import ReactDOM from 'react-dom';

import catch_render_error from './catch_error';

@catch_render_error
export default class TopHeader extends React.Component{

    setHome(){

    }

    render(){
        return(
            <header className='top-header'>
                <div className='content'>
                    <div className="links">
                        <a href="javascript:void(0)" onClick={this.setHome.bind(this)}>设为主页</a>
                        <a href="javascript:void(0)" onClick={this.setHome.bind(this)}>收藏本站</a>
                        <a href="javascript:void(0)" onClick={this.setHome.bind(this)}>添加桌面</a>
                    </div>
                </div>
            </header>
        )
    }
}
