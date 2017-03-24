'use strict'

import React from 'react';
import superagent from 'superagent';


import  {
    site_links_json,
    left_daily_news_json,
    content_header_json,
    addon_links_json,
    guess_prefer_json,
    other_links_json,
    tool_links_json,
    floatleft_links_json,
    left_video_news_json,
    game_section_json,
    video_section_json,
    life_news_json,
    shop_news_json,
    game_news_json,
    head_news_json,
    fun_section_json,
    boring_section_json,
    ency_section_json,
    shop_section_json

} from './global';


export default class Deploy extends React.Component{

    state ={
        modules:[{
            name:"主链接",
            link:site_links_json
        },{
            name:"副链接",
            link:addon_links_json
        },{
            name:"猜你喜欢",
            link:guess_prefer_json
        },{
            name:"其它链接",
            link:other_links_json
        },{
            name:"生活娱乐其它",
            link:tool_links_json
        },{
            name:"头部新闻,链接",
            link:content_header_json
        },{
            name:"左侧今日头条",
            link:left_daily_news_json
        },{
            name:"左侧悬浮窗",
            link:floatleft_links_json
        },{
            name:"左侧顶部新闻",
            link:head_news_json
        },{
            name:"左侧今日视频",
            link:left_video_news_json
        },{
          name:"左侧今日生活",
          link:life_news_json
        },{
          name:"左侧今日购物",
          link:shop_news_json
        },{
          name:"左侧今日游戏",
          link:game_news_json
        },{
          name:"看视频",
          link:video_section_json
        },{
          name:"玩游戏",
          link:game_section_json
        },{
          name:"实惠购物",
          link:shop_section_json
        },{
          name:"生活百科",
          link:ency_section_json
        },{
          name:"打发无聊",
          link:boring_section_json
        },{
          name:"轻松一刻",
          link:fun_section_json
        }]
    }

    handleDeploy(index){
        superagent.post('/deploy').set('Content-Type', 'application/json')
        .accept('application/json').send({json:this.state.modules[index].link}).end(function(err,res){
            if(!err)
            {
                let data = JSON.parse(res.text);
                if(data.code == 0)
                {
                    alert('部署成功！');
                }
            }
        });
    }
    render(){
        return(
            <div className="deploy">
                {this.state.modules.map(function(module,index){
                    return <div className="module" key={index}>
                        <div className="name">{module.name}模块</div>
                        <input type="button" value="部署" className="submit btn" onClick={this.handleDeploy.bind(this,index)} />
                    </div>
                }.bind(this))}
            </div>
        )
    }
}
