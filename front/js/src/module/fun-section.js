'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import catch_render_error from './catch_error';
import SwitchLayout from './switch-layout'
import {fun_section_json} from './global';
import superagent from 'superagent';

@catch_render_error
export default class FunSection extends React.Component{
    state = {
      modules: {
        current_active:0,
        other_labels_index:0,
        fun_categories:[],
        other_labels:[],
        other_labels_list:[],
        left_fun_items:[{title:"",img:"",url:""}],
        right_fun_items:[]
      }

    };
    static defaultProps = {
            fun_head_info:{icon:"/images/fun-section-icon.png",title:"轻松一刻"}
    };
    constructor(){
        super();
        superagent.get(fun_section_json).set('Accept', 'application/json').end(function(err,res){
            if(!err){
                var data = JSON.parse(res.text);
                this.setState({modules:data.modules});
            }
        }.bind(this));
    }
    fun_categories_click(index){
        var data = this.state.modules;
        data.current_active = index;
        data.left_fun_items = this.state.modules.fun_categories[index].left_fun_items;
        data.right_fun_items = this.state.modules.fun_categories[index].right_fun_items;
        this.setState({modules:data});
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
            <section className="fun-section">
                <div className="content">
                  <div className="top-content">
                      <div className="left-head">
                          <div className="icon-div">
                              <span className="icon" style={{backgroundImage:'url(' + this.props.fun_head_info.icon + ')'}}></span>
                          </div>
                          <a href="javascript:void(0)">{this.props.fun_head_info.title}</a>
                      </div>
                      <div className="right-head">
                          <div className="category">
                              {this.state.modules.fun_categories.map(function(value,index){
                                  var cl = index == this.state.modules.current_active?'active':'';
                                  return <a href="javascript:void(0)" className={cl} key={'fun_categories' + index } onClick={this.fun_categories_click.bind(this,index)}>{value.name}</a>
                              }.bind(this))}
                          </div>
                          <div className="control">
                              <div className="other-label">
                                  {this.state.modules.other_labels.map(function(value,index){
                                      return <a className={value.color} href={value.url} key={'other_labels' + index} target="_blank">{value.title}</a>
                                  })}
                              </div>
                              <div className="control-btn">
                                  <div className="switch-labels" onClick={this.switch_btn_click.bind(this,this.state.modules.other_labels_index)}>换一换</div>
                                  <SwitchLayout />
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="bottom-content">
                      <div className="items">
                          <div className="left-items" >
                              <a className="items-url theme-img-bg" href={this.state.modules.left_fun_items[0].url} target="_blank" style={{backgroundImage:'url(' + this.state.modules.left_fun_items[0].img + ')'}}>
                                <span className="items-bg" ></span>
                                <span className="items-title">{this.state.modules.left_fun_items[0].title}</span>
                              </a>
                          </div>
                          <div className="right-items">
                              {this.state.modules.right_fun_items.map(function(value,index){
                                return <a className="items-url theme-img-bg" key={'fun_items_' + index} href={value.url} target="_blank" style={{backgroundImage:'url(' + value.img + ')'}}>
                                          <span className="items-bg" ></span>
                                          <span className="items-title">{value.title}</span>
                                       </a>
                              })}

                          </div>
                      </div>
                  </div>
                </div>
            </section>
        )
    }
}
