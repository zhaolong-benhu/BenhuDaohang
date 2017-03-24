'use strict'

import React from 'react';
import catch_render_error from './catch_error';

import {tool_links_json} from './global';
import superagent from 'superagent';


@catch_render_error
export default class ToolLinks extends React.Component{

    state = {
        modules:[
        ]
    };

    constructor(){
        super();
        superagent.get(tool_links_json).set('Accept', 'application/json').end(function(err,res){
            if(!err){
                var data = JSON.parse(res.text);
                this.setState({modules:data.modules});
            }
        }.bind(this));
    }

    render(){
        return(
            <div className="tool-links">
                <div className="modules">
                    {this.state.modules.map(function(data,index){
                        return <div className="module" key={'module_' + index}>
                            <div className="bar">
                                <div className="icon" style={{backgroundImage:'url('+data.icon+')'}}></div>
                                <div className="name">{data.name}</div>
                            </div>
                            <div className="groups">
                                {data.groups.map(function(group,group_index){
                                    return <div className="group" key={group_index}>

                                        <a className="light-blue" href={group.url} target="_blank">
                                            {group.name}
                                        </a>
                                        {
                                            group.links.map(function(link,link_index){
                                                return <a href={link.url} key={link_index} target="_blank">
                                                    {link.name}
                                                </a>
                                            })
                                        }
                                    </div>
                                })}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        )
    }


}
