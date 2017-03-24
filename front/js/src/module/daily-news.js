'use strict';

import React from 'react';
import catch_render_error from './catch_error';
import superagent from 'superagent';
import {left_daily_news} from './global';

var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

@catch_render_error
export default class DailyNews extends React.Component{

    state = {
            page_current:0,
            tips_display:true
    };

    componentWillUnmount() {
      clearInterval(this.interval);
    }
    componentDidMount(){
        superagent.get(left_daily_news).end(function(err,res){

            if(!err){
                let data = JSON.parse(res.text).data;
                this.setState({previews:data.previews,top_links:data.top_links,tips:data.tips,bottom_links:data.bottom_links});
            }

        }.bind(this));
        this.interval = setInterval(this.tick.bind(this), 15000);

    }

    tick() {
        this.handleNextPage();
    }

    handlePrevPage(){
        let pages = this.state.previews.length;
        let current = (this.state.page_current + pages - 1 )%pages;
        this.setState({page_current:current});
    }

    handleNextPage(){
        let pages = this.state.previews.length;
        let current = (this.state.page_current + 1 )%pages;
        this.setState({page_current:current});
    }

    close(){
      // alert("close...");
      this.setState({tips_display:false});

    }

    render(){
        if(this.state.previews == undefined)
        {
            return <div></div>
        }
        var top_links = [];
        this.state.top_links.map(function(value,index){
            top_links.push({type:'item',data:value});
            if(this.state.tips.show == true){
                if((this.state.tips.index % 2 == 0 && this.state.tips.index == index-1))
                {
                    top_links.push({type:'tips',data:this.state.tips,class:'left'});
                }
                if(this.state.tips.index %2 == 1 && this.state.tips.index == index )
                {
                    top_links.push({type:'tips',data:this.state.tips,class:'right'});
                }
            }
        }.bind(this));
        var bottom_links = [];
        this.state.bottom_links.map(function(value,index){
            bottom_links.push({type:'item',data:value});
            var tips_index = this.state.tips.index - this.state.top_links.length;
            if(this.state.tips.show == true && tips_index >= 0){
                if((tips_index % 2 == 0 && tips_index == index-1))
                {
                    bottom_links.push({type:'tips',data:this.state.tips,class:'left'});
                }
                if(tips_index %2 == 1 && tips_index == index )
                {
                    bottom_links.push({type:'tips',data:this.state.tips,class:'right'});
                }
            }
        }.bind(this));
        return(
            <div className="daily-news">
                <div className="header">
                    <div className="title">今日头条</div>
                    <div className="pages">
                        <div className="info">
                            <span className="current">{this.state.page_current + 1}</span>/{this.state.previews.length}
                        </div>

                        <div className="btns">
                            <a href="javascript:void(0)" onClick={this.handlePrevPage.bind(this)}>{'<'}</a>
                            <a href="javascript:void(0)" onClick={this.handleNextPage.bind(this)}>{'>'}</a>
                        </div>

                    </div>
                </div>
                {/*<ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={1000} transitionLeaveTimeout={0}>*/}

                    <div className="previews" key={this.state.page_current}>
                            <a href={this.state.previews[this.state.page_current].banner.url} target="_blank" className="img"
                            style={{backgroundImage:'url(' + this.state.previews[this.state.page_current].banner.img  + ')'}}>
                            </a>
                            <div className="content">
                                <div className="items">
                                    {this.state.previews[this.state.page_current].links.map(function(data,index){
                                        return (
                                            <div className="item" key={'news_item_' + index}>
                                                <a className="name" href={data.url} target="_blank">{data.name}</a>
                                                <span className="line"></span>
                                                <a className="description" href={data.url} target="_blank">{data.content}</a>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                    </div>

                {/*</ReactCSSTransitionGroup>*/}

                <div className="split-line"></div>

                <div className="links">
                    <div className="content">
                    {top_links.map(function(data,index){
                        if(data.type == 'item')
                        {
                            return <div className="item" key={'news_link_' + index}>
                                            <span className="icon" style={{backgroundImage:'url(' + data.data.icon + ')'}}></span>
                                            <a className="url" target="_blank" href={data.data.links[0].url}>{data.data.links[0].name}</a>
                                            <i className="dot"> </i>
                                            <a className="url" target="_blank" href={data.data.links[1].url}>{data.data.links[1].name}</a>
                                   </div>
                        }
                        else {

                          // return <div className={"tips " + data.class} key={'news_tips_' + index}>
                          //             <span className="text">{this.state.tips.text}</span>
                          //             <img className="close" src="images/news/close.png" onClick={this.close.bind(this)} />
                          //         </div>

                              // {(()=>{

                                  if(this.state.tips_display == true)
                                  {

                                    return <div className={"tips " + data.class} key={'news_tips_' + index}>
                                                <span className="text">{this.state.tips.text}</span>
                                                <a className="close"  onClick={this.close.bind(this)} title="不在提醒"> </a>
                                            </div>
                                  }
                                  else {
                                  }

                                  // })()}


                        }
                    }.bind(this))}
                    </div>

                </div>

                <div className="links-split-line">
                </div>

                <div className="links">
                    <div className="content">
                    {bottom_links.map(function(data,index){
                        if(data.type == 'item')
                        {
                            return <div className="item" key={'news_bottom_link_' + index}>
                                            <span className="icon" style={{backgroundImage:'url(' + data.data.icon + ')'}}></span>
                                            <a className="url" href={data.data.links[0].url}>{data.data.links[0].name}</a>
                                            <i className="dot"> </i>
                                            <a className="url" href={data.data.links[1].url}>{data.data.links[1].name}</a>
                                        </div>
                        }
                        else {
                            return <div className={"tips " + data.class} key={'news_tips_' + index}>
                                        <span className="text">{this.state.tips.text}</span>
                                        <a href="javascript:void(0)" className="close" />
                                    </div>
                        }
                    }.bind(this))}
                    </div>

                </div>
            </div>

        )
    }

}
