'use strict'


import React from 'react';
import superagent from 'superagent';

import {other_links_json} from './global';


export default class OtherLinks extends React.Component{
    state = {
        modules:[]
    };
    constructor(){
        super();
        superagent.get(other_links_json).end(function(err,res){
            if(!err){
                var data = JSON.parse(res.text);
                this.setState({modules:data.modules});
            }
        }.bind(this));
    }

    componentDidMount(){

        document.body.style.overflow = "auto";
    }
    handleSubmit(e){
        e.preventDefault();
        superagent.post(other_links_json).set('Content-Type', 'application/json')
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

    handleChangeGroupName(index,group_index,e){
        let data = this.state.modules;
        data[index].groups[group_index].name = e.target.value;
        this.setState({modules:data});
    }
    handleTopLinkChange(index,link_index,type,e){
        let data = this.state.modules;
        data[index].links[link_index][type] = e.target.value;
        this.setState({modules:data});
    }
    handleGroupLinkChange(index,group_index,link_index,type,e){
        let data = this.state.modules;
        data[index].groups[group_index].links[link_index][type] = e.target.value;
        this.setState({modules:data});
    }
    render(){
        return(
            <form className="other-links" onSubmit={this.handleSubmit.bind(this)}>

                {this.state.modules.map(function(module,index){
                    return(
                        <div className="module" key={index}>
                            <div className="top-links">
                                <div className="title">
                                    {index+1}.顶部链接
                                </div>
                                {module.links.map(function(link,link_index){
                                    return(
                                        <div className="link" key={link_index}>
                                            <input type="text" value={link.name} onChange={this.handleTopLinkChange.bind(this,index,link_index,'name')} />
                                            <input type="text" value={link.url} onChange={this.handleTopLinkChange.bind(this,index,link_index,'url')} />

                                        </div>
                                    )
                                }.bind(this))}
                            </div>
                            <div className="groups">
                                {module.groups.map(function(group,group_index){
                                    return(
                                        <div className="group" key={group_index}>
                                            <div className="name">
                                                <div className="label">{group_index+1}.组名：</div>
                                                <input type="text" value={group.name} onChange={this.handleChangeGroupName.bind(this,index,group_index)}/>
                                                <div className="label">共：{group.links.length}条</div>

                                            </div>
                                            <div className="links">
                                                {group.links.map(function(link,link_index){
                                                    return(
                                                        <div className="link" key={link_index}>
                                                            <input type="text" value={link.name} onChange={this.handleGroupLinkChange.bind(this,index,group_index,link_index,'name')} />
                                                            <input type="text" value={link.link} onChange={this.handleGroupLinkChange.bind(this,index,group_index,link_index,'link')} />

                                                        </div>
                                                    )
                                                }.bind(this))}
                                            </div>
                                        </div>
                                    )
                                }.bind(this))}
                            </div>
                        </div>
                    )
                }.bind(this))}
                <input type="submit" value="保存" className="submit btn"/>
            </form>
        )
    }

}
