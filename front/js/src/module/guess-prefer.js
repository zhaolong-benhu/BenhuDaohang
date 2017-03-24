'use strict'

import catch_render_error from './catch_error';
import React from 'react';

import superagent from 'superagent';

import {guess_prefer_json} from './global';

@catch_render_error
class TopLinks extends React.Component{
    state = {
        links:[{name:"聚划算",url:"https://ju.taobao.com"},
        {name:"爱淘宝",url:"http://ai.taobao.com/"},
        {name:"今日秒杀",url:"http://tejia.aili.com/"},
        {name:"途牛飞机票",url:"http://www.tuniu.com/"},
        {name:"爆款理财",url:"http://8.hao123.com/"},
        {name:"贷款",url:"http://www.hao123.com/loan"},
        {name:"特价酒店",url:"http://hotel.qunar.com/"},
        {name:"运动手表",url:"http://biao.dxbaba.cn/"},
        {name:"手机狂欢购",url:"http://shouji.hao123.co"},
        {name:"低价促销热卖9",url:"http://tejia.hao123.com/"}]
    }
    render(){
        return(
            <div className="top-links">
                {this.state.links.map(function(data,index){
                    return <a href={data.url} target="_blank" key={'top_link_' + index}>{data.name}</a>
                })}
            </div>
        )
    }
}

@catch_render_error
class GuessLinks extends React.Component{
    state = {

        groups:[],
        group_current:0
    };

    constructor(){
        super()
        superagent.get(guess_prefer_json).end(function(err,res){
            if(!err){
                var data = JSON.parse(res.text);

                this.setState({groups:data.groups});
            }
        }.bind(this));
    }

    handleNextPage(){
        let pages = Math.ceil(this.state.groups.length/3);
        this.setState({group_current:(this.state.group_current + 1)%pages});
    }
    handleChangeNext(index){
        let groups = this.state.groups;
        let pages = Math.ceil(groups[index].links.length/7);

        groups[index].current  = (groups[index].current + 1) % pages;
        this.setState({groups:groups});
    }
    render(){
        return(
            <div className="guess-links">
                <div className="img"></div>
                <div className="groups">
                    {this.state.groups.map(function(data,index){
                        let left = 3 * this.state.group_current;
                        let right = 3 * (this.state.group_current + 1);
                        if(index <right && index >=left)
                        {
                            return <div className="group" key={'group_' + index}>
                                <div className="name">
                                    {data.name}
                                </div>
                                <div className="links">
                                    {data.links.map(function(item,item_index){
                                        let left_item = 7 * data.current;
                                        let right_item = 7 * (data.current + 1);
                                        if(item_index >=left_item && item_index < right_item)
                                        {
                                            return <div className="link" key={'link_' + item_index}>
                                                <div className={item.type + ' type'}></div>
                                                <a href={item.url} className={item.color} target="_blank">{item.name}</a>
                                            </div>
                                        }
                                    })}
                                </div>
                                {(()=>{
                                    if(data.links.length >= 7 )
                                    {
                                        return <a className="change" href="javascript:void(0)" onClick={this.handleChangeNext.bind(this,index)}>
                                                换一换
                                                </a>
                                    }
                                })()}


                            </div>
                        }
                    }.bind(this))}
                </div>
                {(()=>{

                    let pages = Math.ceil(this.state.groups.length/3);

                    if(pages > 1)
                    {
                        return <a className="next" href="javascript:void(0)" onClick={this.handleNextPage.bind(this)}></a>
                    }
                })()}
            </div>
        )
    }
}

@catch_render_error
export default class GuessPrefer extends React.Component{

    render(){
        return(
            <div className="guess-prefer">
                <TopLinks />
                <GuessLinks />
            </div>
        )
    }
}
