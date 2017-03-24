'use strict'


import React from 'react';
import superagent from 'superagent';

import {left_daily_news_json} from './global';


export default class LeftDailyNews extends React.Component{

    state = {

    };

    componentDidMount(){
        document.body.style.overflow = "auto";

        superagent.get(left_daily_news_json).end(function(err,res){

            if(!err){
                let data = JSON.parse(res.text).data;
                this.setState({previews:data.previews,top_links:data.top_links,tips:data.tips,bottom_links:data.bottom_links});
            }

        }.bind(this));
    }

    render(){
        if(this.state.previews == undefined)
        {
            return <div></div>
        }
        return(
            <form className="left-daily-news" onSubmit={this.handleSubmit.bind(this)}>
                <div className="previews">
                    <div className="title">头条列表</div>
                    {this.state.previews.map(function(preview,index){
                        return <div className="preview" key={index}>
                        <div className="ads">
                            <div className="label">广告图片</div>
                            <input type="text" value={preview.banner.img} onChange={this.handelPreviewImage.bind(this,index,'img')}/>
                            <input type="text" value={preview.banner.url} onChange={this.handelPreviewImage.bind(this,index,'url')}/>

                        </div>
                            <div className="links">
                                {preview.links.map(function(link,link_index){
                                    return <div className="link">
                                        <div className="input">
                                            <div className="input-label">类目</div>
                                            <input type="text" value={link.name} onChange={this.handlePreviewChange.bind(this,index,link_index,'name')}/>
                                        </div>
                                        <div className="input">
                                            <div className="input-label">链接</div>
                                            <input type="text" value={link.url} onChange={this.handlePreviewChange.bind(this,index,link_index,'url')}/>
                                        </div>
                                        <div className="input">
                                            <div className="input-label">内容</div>
                                            <input type="text" value={link.content} onChange={this.handlePreviewChange.bind(this,index,link_index,'content')}/>
                                        </div>
                                    </div>
                                }.bind(this))}
                            </div>
                        </div>
                    }.bind(this))}

                </div>

                <div className="top-links">
                    <div className="title">分割线上部链接列表</div>
                    {this.state.top_links.map(function(data,index){
                        return <div className="item" key={index} >
                            <div className="icon">
                                <div className="input-label">小图标</div>
                                <input type="text" value={data.icon}  onChange={this.changeTopIcon.bind(this,index,'top_links')}/>
                            </div>
                            {data.links.map(function(link,link_index){
                                return <div className="link">
                                    <div className="input-label">链接</div>

                                    <input type="text" value={link.name} className="name" onChange={this.changeTopLinkName.bind(this,index,link_index,'top_links')} />
                                    <input type="text" value={link.url} className="url" onChange={this.changeTopLinkUrl.bind(this,index,link_index,'top_links')} />

                                </div>
                            }.bind(this))}
                        </div>

                    }.bind(this))}

                </div>

                <div className="bottom-links">
                    <div className="title">分割线下部链接列表</div>
                    {this.state.bottom_links.map(function(data,index){
                        return <div className="item" key={index} >
                            <div className="icon">
                                <div className="input-label">小图标</div>
                                <input type="text" value={data.icon}  onChange={this.changeTopIcon.bind(this,index,'bottom_links')}/>
                            </div>
                            {data.links.map(function(link,link_index){
                                return <div className="link">
                                    <div className="input-label">链接</div>

                                    <input type="text" value={link.name} className="name" onChange={this.changeTopLinkName.bind(this,index,link_index,'bottom_links')} />
                                    <input type="text" value={link.url} className="url" onChange={this.changeTopLinkUrl.bind(this,index,link_index,'bottom_links')} />

                                </div>
                            }.bind(this))}
                        </div>

                    }.bind(this))}

                </div>

                <div className="tip-area">
                    <div className="title">tip位置</div>
                    <div className="tip">
                        <div className="input-label">位置</div>
                        <input value={this.state.tips.index} type="number" onChange={this.handleTipChange.bind(this,'index')} />
                        <div className="input-label">内容</div>
                        <input value={this.state.tips.text} type="text" onChange={this.handleTipChange.bind(this,'text')}/>
                    </div>
                </div>
                <input type="submit" value="保存" className="submit btn"/>

            </form>
        )
    }
    handleSubmit(e){
        e.preventDefault();
        console.log(this.state);
        superagent.post(left_daily_news_json).set('Content-Type', 'application/json')
        .accept('application/json').send({json:this.state}).end(function(err,res){
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

    handlePreviewChange(index,link_index,type,e){
        let state = this.state;
        state.previews[index].links[link_index][type] = e.target.value;
        this.setState({state:state});
    }
    handelPreviewImage(index,type,e){
        let state = this.state;
        state.previews[index].banner[type] = e.target.value;
        this.setState({state:state});
    }
    changeTopIcon(index,type,e){
        let state = this.state;
        state[type][index].icon = e.target.value;
        this.setState({state:state});
    }
    changeTopLinkName(index,link_index,type,e){
        let state = this.state;
        state[type][index].links[link_index].name = e.target.value;
        this.setState({state:state});
    }

    changeTopLinkUrl(index,link_index,type,e){
        let state = this.state;
        state[type][index].links[link_index].url = e.target.value;
        this.setState({state:state});
    }

    handleTipChange(type,e){
        let state = this.state;
        state.tips[type] = e.target.value;
        this.setState({state:state});
    }
}
