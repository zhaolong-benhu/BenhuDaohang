'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import catch_render_error from './catch_error';
import SwitchLayout from './switch-layout'
import {boring_section_json} from './global';
import superagent from 'superagent';

@catch_render_error
export default class BoringSection extends React.Component{
    state = {
       modules:{
         other_labels_index:0,
         other_labels:[],
         other_labels_list:[],
         left_boring_items:[{title:"",img:"",url:""}],

         right_items:[]
       }

    };
    static defaultProps = {
            boring_head_info:{icon:"/images/boring-section-icon.png",title:"打发无聊"}
    };
    constructor(){
        super();
        superagent.get(boring_section_json).set('Accept', 'application/json').end(function(err,res){
            if(!err){
                var data = JSON.parse(res.text);
                this.setState({modules:data.modules});
            }
        }.bind(this));
    }
    switch_btn_click(index){
      var count = this.state.modules.other_labels_list.length;
      if (count <=0 ){
        return;
      }
      var cur_index = index;
      if (index+1 < count){
          ++cur_index;
      }else{
        cur_index = 0;
      }
      var data = this.state.modules;
      data.other_labels_index = cur_index;
      data.other_labels = this.state.modules.other_labels_list[cur_index].other_labels;
      this.setState({modules:data});
    }
    render(){
        return (
            <section className="boring-section">
                <div className="content">
                  <div className="top-content">
                      <div className="left-head">
                          <div className="icon-div">
                              <span className="icon" style={{backgroundImage:'url(' + this.props.boring_head_info.icon + ')'}}></span>
                          </div>
                          <a href="javascript:void(0)">{this.props.boring_head_info.title}</a>
                      </div>
                      <div className="right-head">
                          <div className="other-label">
                              {this.state.modules.other_labels.map(function(value,index){
                                  return <a href={value.url} className={value.color} key={'boring_other_labels' + index} target="_blank">{value.title}</a>
                              })}
                          </div>
                          <div className="control">
                              <div className="switch-labels" onClick={this.switch_btn_click.bind(this,this.state.modules.other_labels_index)}>换一换</div>
                              <SwitchLayout />
                          </div>
                      </div>
                  </div>
                  <div className="bottom-content">
                      <div className="items">
                          <div className="left-items" >
                            <a className="items-url theme-img-bg" href={this.state.modules.left_boring_items[0].url} target="_blank" style={{backgroundImage:'url(' + this.state.modules.left_boring_items[0].img + ')'}}>
                              <span className="items-bg" ></span>
                              <span className="items-title">{this.state.modules.left_boring_items[0].title}</span>
                            </a>
                          </div>
                          <div className="right-items">
                              {this.state.modules.right_items.map(function(value,index){
                                return <div className="items" key={'boring_right_items' + index}>
                                          <div className="items-img">
                                              <a className="items-url theme-img-bg" href={value.first_item.url} target="_blank" style={{backgroundImage:'url(' + value.first_item.img + ')'}}>
                                                 <span className="items-bg" ></span>
                                                 <span className="items-title" >{value.first_item.title}</span>
                                              </a>
                                          </div>
                                          <div className="items-char">
                                              {value.other_items.map(function(data,index){
                                                return <div className="items-char-div" key={'boring_char_items' + index} >
                                                          <div className="dot-div">
                                                            <span className="dot"></span>
                                                          </div>
                                                          <a className="items-char-title" href={data.url} target="_blank">{data.title}</a>
                                                       </div>
                                              }.bind(this))}
                                          </div>
                                       </div>
                              })}
                          </div>
                      </div>
                  </div>
                </div>
            </section>
        )
    }
}
