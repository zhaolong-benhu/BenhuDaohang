'use strict'


import React from 'react';
import superagent from 'superagent';

import {guess_prefer_json} from './global';


export default class GuessPrefer extends React.Component{
    state = {
        groups:[]
    };
    constructor(){
        super();
        superagent.get(guess_prefer_json).end(function(err,res){
            if(!err){
                var data = JSON.parse(res.text);
                this.setState({groups:data.groups});
            }
        }.bind(this));
    }

    componentDidMount(){

        document.body.style.overflow = "auto";
    }
    handleSubmit(e){
        e.preventDefault();
        superagent.post(guess_prefer_json).set('Content-Type', 'application/json')
        .accept('application/json').send({json:this.state.groups}).end(function(err,res){
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

    handleLinkChange(index,group_index,type,e){
        let data = this.state.groups;
        data[index].links[group_index][type] = e.target.value;
        this.setState({groups:data});
    }
    handleGroupChange(index,e)
    {
        let data = this.state.groups;
        data[index].name = e.target.value;
        this.setState({groups:data});
    }

    render(){
        return(
            <form  className="guess-prefer" onSubmit={this.handleSubmit.bind(this)}>
                {this.state.groups.map(function(group,index){
                    return <div className="group" key={index}>
                        <div className="title">
                            <div>标签名：</div>
                            <input type="text" value={group.name} onChange={this.handleGroupChange.bind(this,index)}/>
                        </div>
                        <div className="items">
                            {group.links.map(function(link,group_index){
                                return <div className="link" key={group_index}>
                                    <input type="text" className="name" value={link.name} onChange={this.handleLinkChange.bind(this,index,group_index,'name')}/>
                                    <input type="text" className="url" value={link.url} onChange={this.handleLinkChange.bind(this,index,group_index,'url')} placeholder="链接地址"/>
                                    <input type="text" className="type" value={link.type} onChange={this.handleLinkChange.bind(this,index,group_index,'type')} placeholder="链接类型，可选(hot)"/>
                                    <input type="text" className="color" value={link.color} onChange={this.handleLinkChange.bind(this,index,group_index,'color')} placeholder="链接颜色,可选(orange,light-blue)"/>

                                </div>
                            }.bind(this))}
                        </div>
                    </div>
                }.bind(this))}
                <input type="submit" value="保存" className="submit btn"/>
            </form>
        )
    }


}
