'use strict';

import React from 'react';
import catch_render_error from './catch_error';
import {life_news_json} from './global';
import superagent from 'superagent';

@catch_render_error
export default class LifeNews extends React.Component{

    state = {
            modules:{
              current_active:0,
              left_img_items:[{title:"",img:"",url:""}],
              left_char_items:[],
              life_categories:[]
            }
    };
    constructor(){
        super();
        superagent.get(life_news_json).set('Accept', 'application/json').end(function(err,res){
            if(!err){
                var data = JSON.parse(res.text);
                this.setState({modules:data.modules});
            }
        }.bind(this));
    }
    life_categories_click(index){
        var data = this.state.modules;
        data.current_active = index;
        data.left_img_items = this.state.modules.life_categories[index].left_img_items;
        data.left_char_items = this.state.modules.life_categories[index].left_char_items;
        this.setState({modules:data});
    }
    render(){
        return(
            <div className="life-news">
                <div className="header">
                  {this.state.modules.life_categories.map(function(value,index){
                      var active = index == this.state.modules.current_active?'active':"";
                      return <a href="javascript:void(0)" className={active} key={'life_categories' + index } onClick={this.life_categories_click.bind(this,index)}>
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
                          return <div className="items-char-div" key={'life_news_char' + index}>
                                    <div className="ico-div" >
                                      <span className="ico"></span>
                                    </div>
                                    <a className={value.color} href={value.url} target="_blank">{value.title}</a>
                                </div>
                        }.bind(this))}
                    </div>
                </div>
            </div>

        )
    }

}
