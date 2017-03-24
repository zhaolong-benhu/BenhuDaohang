
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import catch_render_error from './catch_error';
import SwitchLayout from './switch-layout';

import {video_section_json} from './global';
import superagent from 'superagent';

@catch_render_error
export default class VideoSection extends React.Component{
    state = {
        modules: {
            current_active:0,
            other_labels_index:0,
            left_img_items:{title:"",img:"",url:""},
            left_char_items:[],
            right_first_items:[{title:"",ad_title:"",img:"",url:""}],
            right_other_items:[],
           video_categories:[],
           other_labels:[],
           other_labels_list:[]
        }
    };
    static defaultProps = {
            video_head_info:{icon:"/images/video-section-icon.png",title:"看视频"},
            video_play_icon:{icon:"/images/video-section-play.png"}

    };
    video_categories_click(index){
        var data = this.state.modules;
        data.current_active = index;
        data.right_first_items = this.state.modules.video_categories[index].right_first_items;
        data.right_other_items = this.state.modules.video_categories[index].right_other_items;
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
    constructor(){
        super();
        superagent.get(video_section_json).set('Accept', 'application/json').end(function(err,res){
            if(!err){
                var data = JSON.parse(res.text);
                this.setState({modules:data.modules});
            }
        }.bind(this));
    }
    render(){
        return (
            <section className="video-section">
                <div className="content">
                  <div className="top-content">
                      <div className="left-head">
                          <div className="icon-div">
                              <span className="icon" style={{backgroundImage:'url(' + this.props.video_head_info.icon + ')'}}></span>
                          </div>
                          <a href="javascript:void(0)">{this.props.video_head_info.title}</a>
                      </div>
                      <div className="right-head">
                          <div className="category">
                              {this.state.modules.video_categories.map(function(value,index){
                                  var cl = index == this.state.modules.current_active?'active':'';
                                  return <a href="javascript:void(0)" className={cl} key={'video_categories' + index } onClick={this.video_categories_click.bind(this,index)}>{value.name}</a>
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
                              <div className="items-img">
                                  <a className="items-url theme-img-bg" href={this.state.modules.left_img_items.url} target="_blank" style={{backgroundImage:'url(' + this.state.modules.left_img_items.img + ')'}}>
                                     <span className="items-bg" ></span>
                                     <span className="items-title">{this.state.modules.left_img_items.title}</span>
                                  </a>
                              </div>
                              <div className="items-char">
                                  {this.state.modules.left_char_items.map(function(data,index){
                                    return <div className="items-char-div" key={'video_char_items' + index} >
                                              <div className="play-div">
                                                <a className="play-ico" href={data.url} target="_blank" style={{backgroundImage:'url(' + this.props.video_play_icon.icon + ')'}}></a>
                                              </div>
                                              <a className="items-char-title" href={data.url} target="_blank">{data.title}</a>
                                           </div>
                                  }.bind(this))}
                              </div>
                          </div>
                          <div className="right-items">
                            <div className="left-items-div">
                                <div className="items-div" >
                                  <a className="items-url theme-img-bg" href={this.state.modules.right_first_items[0].url} target="_blank" style={{backgroundImage:'url(' + this.state.modules.right_first_items[0].img + ')'}}>
                                     <span className="items-bg" ></span>
                                     <span className="items-title">{this.state.modules.right_first_items[0].ad_title}</span>
                                  </a>
                                  <div className="video-title">
                                    <div className="items-char-div">
                                      <div className="play-div">
                                        <a className="play-ico" href={this.state.modules.right_first_items[0].url} target="_blank" style={{backgroundImage:'url(' + this.props.video_play_icon.icon + ')'}}></a>
                                      </div>
                                      <a className="items-char-title" href={this.state.modules.right_first_items[0].url} target="_blank">{this.state.modules.right_first_items[0].title}</a>
                                    </div>
                                  </div>
                                </div>
                            </div>
                            <div className="right-items-div" >
                              {this.state.modules.right_other_items.map(function(value,index){
                                return <div className="items-div" key={'video_items_' + index}>
                                          <a className="items-url theme-img-bg" href={value.url} target="_blank" style={{backgroundImage:'url(' + value.img + ')'}}>
                                             <span className="items-bg" ></span>
                                             <span className="items-title">{value.ad_title}</span>
                                          </a>
                                          <div className="video-title">
                                            <div className="items-char-div">
                                              <div className="play-div">
                                                <a className="play-ico" href={value.url} target="_blank" style={{backgroundImage:'url(' + this.props.video_play_icon.icon + ')'}}></a>
                                              </div>
                                              <a className="items-char-title" href={value.url} target="_blank">{value.title}</a>
                                            </div>
                                          </div>
                                       </div>
                              }.bind(this))}
                            </div>
                          </div>
                      </div>
                  </div>
                </div>
            </section>
        )
    }
}
