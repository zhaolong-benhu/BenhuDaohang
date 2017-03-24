'use strict';

import React from 'react';
import catch_render_error from './catch_error';

import {video_news_json} from './global';
import superagent from 'superagent';

@catch_render_error
export default class VideoNews extends React.Component{

    state = {
            modules: {
              current_active:0,
              left_img_items:[{title:"",img:"",url:""}],
              left_char_items:[],
              video_categories:[]
            }
    };
    static defaultProps = {
            video_play_icon:{icon:"/images/video-section-play.png"}

    };
    constructor(){
        super();
        superagent.get(video_news_json).set('Accept', 'application/json').end(function(err,res){
            if(!err){
                var data = JSON.parse(res.text);
                this.setState({modules:data.modules});
            }
        }.bind(this));
    }
    video_categories_click(index){
      var data = this.state.modules;
      data.current_active = index;
      data.left_img_items = this.state.modules.video_categories[index].left_img_items;
      data.left_char_items = this.state.modules.video_categories[index].left_char_items;
      this.setState({modules:data});
    }
    render(){
        return(
            <div className="video-news">
                <div className="header">
                  {this.state.modules.video_categories.map(function(value,index){
                      var active = index == this.state.modules.current_active?'active':"";
                      return <a href="javascript:void(0)" className={active} key={'video_categories' + index } onClick={this.video_categories_click.bind(this,index)}>
                                <span className="name">{value.name}</span>
                                <span className="line"></span>
                             </a>
                  }.bind(this))}

                </div>
                <div className="links">
                    <div className="items-img">
                        <a className="items-url theme-img-bg" href={this.state.modules.left_img_items[0].url} target="_blank" style={{backgroundImage:'url(' + this.state.modules.left_img_items[0].img + ')'}}>
                           <span className="items-bg" ></span>
                           <span className="items-title" >{this.state.modules.left_img_items[0].title}</span>
                        </a>
                    </div>
                    <div className="items-char">
                        {this.state.modules.left_char_items.map(function(value,index){
                          var which_one = "";
                          var title = value.title;
                          var intro_title = value.intro_title;
                          if (this.state.modules.current_active == 0){
                             which_one = "is_first ";
                             intro_title = "";
                          }else if (this.state.modules.current_active == 3) {
                             which_one = "is_fourth ";
                             title = value.intro_title;
                             intro_title = value.title;
                          }
                          return <div className={which_one + 'items-char-div'} key={'life_news_char' + index}>
                                    <div className="title">
                                      <div className="play-div">
                                        <a className="play-ico" href={value.url} target="_blank" style={{backgroundImage:'url(' + this.props.video_play_icon.icon + ')'}}></a>
                                      </div>
                                      <a className={value.color} href={value.url} target="_blank">{title}</a>
                                    </div>
                                    <a className="intro" href={value.url} target="_blank">{intro_title}</a>
                                </div>
                        }.bind(this))}
                    </div>
                </div>
            </div>

        )
    }

}
