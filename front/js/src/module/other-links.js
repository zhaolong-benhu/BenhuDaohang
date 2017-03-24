'use strict'

import React from 'react';
import catch_render_error from './catch_error';

import {other_links_json} from './global';
import superagent from 'superagent';



@catch_render_error
class LinkModule extends React.Component{
    static propTypes = {
    index: React.PropTypes.number.isRequired,
    titles: React.PropTypes.array.isRequired,
    groups: React.PropTypes.array.isRequired
    };
    state = {
        pages:{}
    }
    handleChangeNext(index){
        let group = this.props.groups[index];
        let page = group.links.length / group.per_page;
        let pages = this.state.pages;
        let key = 'index_' + index;
        if(this.state.pages[key] == undefined)
        {
            pages[key] = 1;
        }
        else{
            pages[key] = (pages[key] + 1)%page;

        }
        this.setState({pages:pages});

    }
    render(){
        return(
            <div className="link-module">
                <div className={this.props.index == 0?"main-title titles":"normal-title titles"}>
                    {this.props.titles.map(function(data,index){
                        return <a href={data.url} target="_blank" key={'title_' + index}>{data.name}</a>
                    })}

                </div>
                <div className="groups">
                    {this.props.groups.map(function(data,index){
                        let key = 'index_' + index;
                        let current = 0;
                        if(this.state.pages[key] != undefined)
                        {
                            current = this.state.pages[key];
                        }
                        let left = data.per_page * current;
                        let right = data.per_page * (current + 1);
                        return(
                            <div className="group" key={'group_' + index}>
                                <div className="name">
                                    {data.name}
                                </div>
                                <div className="links">
                                    {data.links.map(function(link,link_index){
                                        if(link_index < right && link_index >= left)
                                        {
                                            return <a href={link.link} target="_blank" key={'group_link_'+index + link_index}>{link.name}</a>
                                        }
                                    })}
                                </div>
                                {(()=>{
                                    if(data.links.length > 7)
                                    {
                                        return <a className="change" href="javascript:void(0)" onClick={this.handleChangeNext.bind(this,index)}>
                                                换一换
                                                </a>
                                    }
                                })()}
                            </div>
                        )
                    }.bind(this))}
                </div>

            </div>
        )
    }
}



@catch_render_error
export default class OhterLinks extends React.Component{
    state = {
        modules:[
        ]
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

    render(){
        return(
            <div className="other-links">
                {this.state.modules.map(function(data,index){
                    return <LinkModule groups={data.groups} titles={data.links} key={'link_module_' + index} index={index} />
                })}

            </div>

        )
    }


}
