'use strict'


import React from 'react';
import superagent from 'superagent';

import {addon_links_json} from './global';

export default class AddonLinks extends React.Component{

    state = {
        addons:[]
    }

    componentDidMount(){
        document.body.style.overflow = "auto";
    }

    constructor(){
        super();
        superagent.get(addon_links_json).end(function(err,res){
            if(!err){
                var data = JSON.parse(res.text);
                this.setState({addons:data.addons});
            }
        }.bind(this));
    }
    changeLinkName(index,link_index,e){
        let value = e.target.value;
        let data = this.state.addons;
        data[index].link[link_index].name = e.target.value;
        this.setState({addons:data});
    }
    changeLinkUrl(index,link_index,e){
        let value = e.target.value;
        let data = this.state.addons;
        data[index].link[link_index].url = e.target.value;
        this.setState({addons:data});
    }
    handleSubmit(e){
        e.preventDefault();
        superagent.post(addon_links_json).set('Content-Type', 'application/json')
        .accept('application/json').send({json:this.state.addons}).end(function(err,res){
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
    handleTipTypeChange(index,e){
        let data = this.state.addons;
        data[index].tip.type = e.target.value;
        this.setState({addons:data});
    }
    handleTipTextChange(index,type,e)
    {
        let data = this.state.addons;
        if(type == 'bubble')
        {
            data[index].tip.text = e.target.value;
        }
        else{
            data[index].tip.image_url = e.target.value;
        }
        this.setState({addons:data});

    }


    render(){
        return(
            <form className="addon-links" onSubmit={this.handleSubmit.bind(this)}>

                {this.state.addons.map(function(data,index){
                    return <div className="item" key={index} >
                        {data.link.map(function(link,link_index){
                            return <div className="link">
                                <input type="text" value={link.name} className="name" onChange={this.changeLinkName.bind(this,index,link_index)} />
                                <input type="text" value={link.url} className="url" onChange={this.changeLinkUrl.bind(this,index,link_index)} />
                            </div>
                        }.bind(this))}

                        {(()=>{
                            if(data.tip)
                            {
                                    return<div className="tip">
                                        <div className="type">
                                            <input type="text" value={data.tip.type} placeholder="输入文字显示样式,可选(bubble,image,hot)"
                                                onChange={this.handleTipTypeChange.bind(this,index)}
                                            />
                                        </div>
                                        {(()=>{
                                            if(data.tip.type == 'bubble')
                                            {
                                                return <div className="bubble">
                                                    <input type="text" value={data.tip.txt} placeholder="输入文字"
                                                    onChange={this.handleTipTextChange.bind(this,index,'bubble')}

                                                    />
                                                </div>
                                            }
                                            else{
                                                return <div className="image">
                                                    <input type="text" value={data.tip.image_url} placeholder="输入图片链接"
                                                        onChange={this.handleTipTextChange.bind(this,index,'image')}
                                                    />
                                                </div>
                                            }
                                        })()}


                                        <div className="url">
                                            <input type="text" value={data.tip.url} placeholder="输入链接"/>
                                        </div>
                                    </div>
                            }
                        })()}

                    </div>
                }.bind(this))}

                <input type="submit" value="保存" className="submit btn"/>
                <div className="bottom"> </div>
            </form>
        )
    }
}
