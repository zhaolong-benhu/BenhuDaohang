'use strict'

import catch_render_error from './catch_error';

import React from 'react';

import {site_links_json,addon_links_json,floatleft_links_json} from './global';

import superagent from 'superagent';


@catch_render_error
class MainLinks extends React.Component {

    state = {
        links: []
    };

    constructor(){
        super();
        superagent.get(site_links_json).end(function(err,res){
            if(!err){
                var data = JSON.parse(res.text);

                this.setState({links:data.links});
            }
        }.bind(this));
    }

    render() {
        return (
            <div className = "main-links">
            {this.state.links.map(function(data, index) {
                    return(
                        <div className="item" key={'main_links_' + index}>
                            <span className = "icon" style = {{backgroundImage: 'url(' + data.icon + ')'}} ></span>
                            <a href={data.link[0].url} target="_blank">{data.link[0].name}</a>
                            {
                                    (() => {
                                        if (data.link.length == 2) {
                                            return <span className = "dot" > </span>
                                        }
                                    })()
                            }

                            {
                                (() => {
                                    if (data.link.length == 2) {
                                        return <a href ={data.link[1].url} target="_blank" >{data.link[1].name}</a>
                                    }
                                })()
                            }
                            </div>
                        )})}
                </div>
                )
    }
}

@catch_render_error
class AddonLinks extends React.Component {
    state = {
        addons: [{
            link: [{name: '东方财富',url: ''}, {name: '理财',url: ''}],
            tip: {txt: '春节在线',type: 'bubble'}
        },{
            link:[{name:'58同城',url:''}]
        },{
            link:[{name:'搜 房 网',url:''}]
        },{
            link:[{name:'携程旅游网',url:''}]
        },{
            link:[{name:'PPTV聚力',url:''}]
        },{
            link:[{name:'旅游',url:''},{name:'12306',url:''}]
        },{
            link: [{name: '聚美优品',url: ''}, {name: '',url: ''}],
            tip: {txt: '虎虎购物',type: 'bubble'}
        },{
            link:[{name:'赶紧网',url:''}]
        },{
            link:[{name:'易车网',url:''}]
        },{
            link:[{name:'去哪儿网',url:''}]
        },{
            link:[{name:'爱卡骑车',url:''}]
        },{
            link:[{name:'工商银行',url:''},{name:'',url:''}]
        },{
            link: [{name: '唯品会',url: ''}, {name: '购物',url: ''}],
            tip: {txt: '春节1折',type: 'bubble'}
        },{
            link:[{name:'同城旅游',url:''}]
        },{
            link:[{name:'途牛旅游网',url:''}]
        },{
            link:[{name:'彩票开奖',url:''}]
        },{
            link:[{name:'太平洋汽车',url:''}]
        },{
            link:[{name:'中国移动',url:''},{name:'',url:''}]
        },{
            link: [{name: 'hao到家',url: ''}, {name: '限时抢购',url: ''}],
            tip: {txt: '',type: 'bubble',url:''}
        },{
            link:[{name:'乐居二手房',url:''}]
        },{
            link:[{name:'中华英才网',url:''}]
        },{
            link:[{name:'在线学习',url:''}]
        },{
            link:[{name:'萌主页*动漫V聚力',url:''}]
        },{
            link:[{name:'海淘',url:''},{name:'手机',url:''}]
        },{
            link: [{name: '苏宁易购',url: ''}, {name: '网购',url: ''}],
            tip: {type: 'image',url:'','image_url':'/images/好车-在线.png'}
        },{
            link:[{name:'国美在线',url:'',color:'orange'}]
        },{
            link:[{name:'购物大全',url:''}]
        },{
            link:[{name:'1 号 店',url:'',color:'light-blue'}]
        },{
            link:[{name:'爱淘宝',url:''}]
        },{
            link:[{name:'携程机票',url:''},{name:'',url:''}]
        }]
    };
    constructor(){
        super()
        superagent.get(addon_links_json).set('Accept', 'application/json').end(function(err,res){
            if(!err){
                var data = JSON.parse(res.text);
                this.setState({addons:data.addons});
            }
        }.bind(this));
    }
    render() {
        return ( < div className = "addon-links" > {
            this.state.addons.map(function(data, index) {
                return (
                    < div className = "item" key = {'addon_item_' + index } >
                    <a href={ data.link[0].url} target="_blank" className={data.link[0].color} >{data.link[0].name}</a>
                    {
                    (() => {
                        if (data.link.length == 2) {
                            return <span className = "dot" ></span>
                        }
                    })()
                } {
                    (() => {
                        if (data.link.length == 2) {
                            return <a href={ data.link[1].url} target="_blank">{data.link[1].name}</a>
                        }
                    })()
                }
                {
                   (() => {
                       if (data.tip && data.tip.type == 'bubble') {
                           return <a className={data.tip.type} href={ data.tip.url} target="_blank">
                                    <span>{data.tip.txt}</span></a>
                       }
                       else if(data.tip){
                           return <a className={data.tip.type} href={ data.tip.url} target="_blank">
                                    <span style={{backgroundImage:'url(' + data.tip.image_url + ')'}}> </span></a>
                       }
                   })()
               }
                < /div>)
            })
        } < /div>)
    }
}

export default class SiteLinks extends React.Component {
    render() {
        return ( < div className = "site-links" >
            < MainLinks / >
            < div className = "split-line" > < /div> < AddonLinks / >
            < /div>
        )
    }
}
