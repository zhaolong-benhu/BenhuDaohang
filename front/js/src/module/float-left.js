'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import catch_render_error from './catch_error';

import {float_left_json} from './global';
import superagent from 'superagent';


var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

@catch_render_error
export default class Float_left extends React.Component{

  state = {
      leftaddons:{
        items:[]
      },
      display:true,
      show:true
  }

    constructor(){
        super();
        superagent.get(float_left_json).set('Accept', 'application/json').end(function(err,res){
            if(!err){
                var data = JSON.parse(res.text);
                this.setState({leftaddons:data.leftaddons});
            }
        }.bind(this));
    }

    componentDidMount(){
      window.addEventListener('resize',this.onSize.bind(this));
    }
    onSize(){
      if(window.innerWidth < (1250 + 160))
      {
        this.setState({show:false});
      }
      else
      {
        this.setState({show:true});
      }
    }

    toggleShowHide()
    {
      this.setState({display:!this.state.display});
      // alert("clicked...")
    }
    render()
    {
          if(!this.state.show)
          {
            return <div></div>
          }
          var current_title = false == this.state.display?'展开':'收起';
          return(
            <div className={this.state.display?"float-left-container content-show":"float-left-container content-hide"} >
                <div className="float-arrow" title={current_title} onClick={this.toggleShowHide.bind(this)}>
                </div>
                <ReactCSSTransitionGroup transitionName="slide-move" transitionEnterTimeout={300} transitionLeaveTimeout={300}>

                  {(()=>{
                    if(this.state.display)
                    {
                      return(
                        <div className="content">
                              <div className="btns-container">
                                {this.state.leftaddons.items.map(function(data,index){
                                  return<div className="item">

                                        <div className="default" title={data.name}>
                                            <div className="hot-img">
                                                <a href={data.url} target="_blank">
                                                  <img src={data.icon}/>
                                                </a>
                                            </div>
                                            <div className="hot-text">
                                              <a className="text" href={data.url} target="_blank">{data.name}</a>
                                            </div>
                                        </div>

                                        <div className="hook" title={data.links}>
                                            <div className="text">
                                                <a className="link" href={data.url} target="_blank">{data.links}</a>
                                                <a className="desc" href={data.url} target="_blank">{data.desc}</a>
                                            </div>

                                             <a className="image" href={data.url} target="_blank">
                                              <img src={data.img} width="63px" height="63px"/>
                                             </a>
                                        </div>

                                  </div>
                                }.bind(this))}
                              </div>
                        </div>
                      )
                    }
                  })()}
                </ReactCSSTransitionGroup>
            </div>

          )
    }

}
