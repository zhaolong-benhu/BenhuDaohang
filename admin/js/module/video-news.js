'use strict'


import React from 'react';
import superagent from 'superagent';

import {left_video_news_json} from './global';


export default class LeftVideoNews extends React.Component{

    state = {
        modules:{
          current_active:0,
          left_img_items:[{title:"",img:"",url:""}],
          left_char_items:[],
          video_categories:[]
        }
    };

    componentDidMount(){
        document.body.style.overflow = "auto";
    }

    constructor(){
        super();
        superagent.get(left_video_news_json).end(function(err,res){
            if(!err){
                var data = JSON.parse(res.text);
                this.setState({modules:data.modules});
            }
        }.bind(this));
    }

    render(){
        return(
            <form className="video-news" onSubmit={this.handleSubmit.bind(this)}>

            <div className="previews">
                <div className="title">视频列表</div>
                {this.state.modules.video_categories.map(function(categories,index){
                  var which_one = index==0?"is_first ":"";
                  return <div className="preview" key={index}>
                          <div className="ads">
                              <div className="label">组名</div>
                              <input type="text" value={categories.name} onChange={this.handleGroupNameChange.bind(this,index)} />
                          </div>
                          <div className="links">
                              {categories.left_img_items.map(function(link,link_index){
                                  return <div className="link" key={link_index}>
                                      <div className="input">
                                          <div className="input-label">标题</div>
                                          <input type="text" value={link.title} onChange={this.handleLinksChange.bind(this,index,link_index,'title')} />
                                      </div>
                                      <div className="input">
                                          <div className="input-label">图片</div>
                                          <input type="text" value={link.img} onChange={this.handleLinksChange.bind(this,index,link_index,'img')} />
                                      </div>
                                      <div className="input">
                                          <div className="input-label">链接</div>
                                          <input type="text" value={link.url} onChange={this.handleLinksChange.bind(this,index,link_index,'url')} />
                                      </div>
                                  </div>
                              }.bind(this))}
                              <div className="space"></div>

                              {categories.left_char_items.map(function(link,link_index){
                                  return <div className="link" key={link_index}>
                                      <div className="input">
                                          <div className="input-label">标题</div>
                                          <input type="text" value={link.title} onChange={this.handleLinks2Change.bind(this,index,link_index,'title')} />
                                      </div>
                                      <div className={which_one + 'input'}>
                                          <div className="input-label">副标题</div>
                                          <input type="text" value={link.intro_title} onChange={this.handleLinks2Change.bind(this,index,link_index,'intro_title')} />
                                      </div>
                                      <div className="input">
                                          <div className="input-label">链接</div>
                                          <input type="text" value={link.url} onChange={this.handleLinks2Change.bind(this,index,link_index,'url')} />
                                      </div>
                                  </div>
                              }.bind(this))}
                          </div>
                  </div>
              }.bind(this))}

            </div>

            <input type="submit" value="保存" className="submit btn"/>

            </form>
        )
    }

    handleSubmit(e){
        e.preventDefault();
        superagent.post(left_video_news_json).set('Content-Type', 'application/json')
        .accept('application/json').send({json:this.state.modules}).end(function(err,res){
            if(!err)
            {
                let data = JSON.parse(res.text);
                if(data.code == 0)
                {
                    location.href = "/";
                }
            }
        });
    }

    handleGroupNameChange(index,e){
        let data = this.state.modules;
        data.video_categories[index].name = e.target.value;
        this.setState({modules:data});
    }

    handleLinksChange(index,link_index,type,e){
        let data = this.state.modules;
        data.video_categories[index].left_img_items[link_index][type] = e.target.value;
        if(index == 0)
        {
          data.left_img_items[index][type]= e.target.value;
        }
        this.setState({modules:data});
    }

    handleLinks2Change(index,link_index,type,e){
        let data = this.state.modules;
        data.video_categories[index].left_char_items[link_index][type] = e.target.value;
        if(index == 0)
        {
          data.left_char_items[link_index][type] = e.target.value;
        }
        this.setState({modules:data});
    }
}
