'use strict';


import React from 'react';
import ReactDOM from 'react-dom';
import catch_render_error from './catch_error';
import {footer_json} from './global';
import superagent from 'superagent';
@catch_render_error
export default class Footer extends React.Component{
    state = {
          modules:{
            friend_links:[]
          }
    };
    static defaultProps = {
            about_links:[{name:"关于我们",url:"http://www.benhu.org/introduction.html"},
                         {name:"产品展示",url:"http://www.benhu.org/show.html"},
                         {name:"最新招聘",url:"http://www.benhu.org/jobs.html"},
                         {name:"联系我们",url:"http://www.benhu.org/contactus.html"}],
            company_info:{name:"Copyright ©2016 123.benhu.com. All Rights Reserved.",num:"浙ICP备11041689号-8"}
    };
    constructor(){
        super();
        try{
            this.state = {modules:g_footer_json.modules};
        }
        catch(e)
        {
            // console.error(e);
        }
        // superagent.get(footer_json).set('Accept', 'application/json').end(function(err,res){
        //     if(!err){
        //         var data = JSON.parse(res.text);
        //         this.setState({modules:data.modules});
        //     }
        // }.bind(this));
    }
    render(){
        return(
            <footer className='footer'>
                <div className='content'>
                  <div className='friend-links'>
                    {this.state.modules.friend_links.map(function(value,index){
                        return <div className="item" key={'friend_links_' + index}>
                                  <div className="item-title">
                                    <span className="icon" style={{backgroundImage:'url(' + value.icon + ')'}}></span>
                                    <a href="javascript:void(0)" target="_blank">{value.title}</a>
                                  </div>
                                  <div className="item-content">
                                    {value.items.map(function(value,index){
                                      return <a href={value.url} target="_blank" key={'friend_links_items_' + index}>{value.name}</a>
                                    })}
                                  </div>
                              </div>
                    })}
                  </div>
                  <div className='about-us'>
                    <div className="about-links">
                      {this.props.about_links.map(function(value,index){
                        return <div className="about-items" key={'about_links_' + index}>
                                  <span className="line"></span>
                                  <a href={value.url} target="_blank">{value.name}</a>
                               </div>
                      })}
                    </div>
                    <div className="company-name">{this.props.company_info.name}</div>
                    <div className="company-num">{this.props.company_info.num}</div>
                  </div>
                </div>
            </footer>
        )
    }
}
