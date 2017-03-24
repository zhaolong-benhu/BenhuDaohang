'use strict'

import React from 'react';
import superagent from 'superagent';

import {tool_links_json} from './global';

export default class ToolLinks extends React.Component{

    state = {
        modules:[]
    }
    componentDidMount(){
        document.body.style.overflow = "auto";
    }
    constructor(){
        super();
        superagent.get(tool_links_json).end(function(err,res){
            if(!err){
                var data = JSON.parse(res.text);

                this.setState({modules:data.modules});
            }
        }.bind(this));
    }
    handleSubmit(e){
        e.preventDefault();
        superagent.post(tool_links_json).set('Content-Type', 'application/json')
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
    handleChangeGroup(index,group_index,type,e){
        let data = this.state.modules;
        data[index].groups[group_index][type] = e.target.value;
        this.setState({modules:data});
    }
    handleLinkChange(index,group_index,link_index,type,e){
        let data = this.state.modules;
        data[index].groups[group_index].links[link_index][type] = e.target.value;
        this.setState({modules:data});
    }
    render(){
        return(
            <form  className="tool-links" onSubmit={this.handleSubmit.bind(this)}>
                {this.state.modules.map(function(module,index){
                return <div className="module" key={index}>
                    <div className="title">{module.name}</div>
                    <div className="groups">
                        {module.groups.map(function(group,group_index){
                            return <div className="group" key={group_index}>
                                <div className="group-name">
                                    <input type="text" className="name"  value={group.name} onChange={this.handleChangeGroup.bind(this,index,group_index,'name')} />
                                    <input type="text"  className="url" value={group.url} onChange={this.handleChangeGroup.bind(this,index,group_index,'url')} />
                                </div>
                                <div className="links">
                                    {group.links.map(function(link,link_index){
                                    return <div className="link" key={link_index}>
                                        <input type="text" value={link.name} onChange={this.handleLinkChange.bind(this,index,group_index,link_index,'name')}/>
                                        <input type="text" value={link.url} onChange={this.handleLinkChange.bind(this,index,group_index,link_index,'url')}/>
                                    </div>
                                }.bind(this))}
                                </div>
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
