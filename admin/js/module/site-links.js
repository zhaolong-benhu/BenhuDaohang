'use strict'


import React from 'react';
import superagent from 'superagent';

import {site_links_json} from './global';

export default class SiteLinks extends React.Component{
    constructor(){
        super();
        superagent.get(site_links_json).end(function(err,res){
            if(!err){
                var data = JSON.parse(res.text);

                this.setState({links:data.links});
            }
        }.bind(this));
    }

    componentDidMount(){

        document.body.style.overflow = "auto";
    }

    state = {
        links:[]
    }

    changeIcon(index,e){
        let value = e.target.value;
        let data = this.state.links;
        data[index].icon = e.target.value;
        this.setState({links:data});

    }
    changeLinkName(index,link_index,e){
        let value = e.target.value;
        let data = this.state.links;
        data[index].link[link_index].name = e.target.value;
        this.setState({links:data});
    }
    changeLinkUrl(index,link_index,e){
        let value = e.target.value;
        let data = this.state.links;
        data[index].link[link_index].url = e.target.value;
        this.setState({links:data});
    }
    handleSubmit(e){
        e.preventDefault();
        superagent.post(site_links_json).set('Content-Type', 'application/json')
        .accept('application/json').send({json:this.state.links}).end(function(err,res){
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
    render(){
        return(
            <form className="site-links" onSubmit={this.handleSubmit.bind(this)}>

                {this.state.links.map(function(data,index){
                    return <div className="item" key={index} >
                        <div className="icon">
                            <input type="text" value={data.icon}  onChange={this.changeIcon.bind(this,index)}/>
                        </div>
                        {data.link.map(function(link,link_index){
                            return <div className="link">
                                <input type="text" value={link.name} className="name" onChange={this.changeLinkName.bind(this,index,link_index)} />
                                <input type="text" value={link.url} className="url" onChange={this.changeLinkUrl.bind(this,index,link_index)} />

                            </div>
                        }.bind(this))}
                    </div>
                }.bind(this))}

                <input type="submit" value="保存" className="submit btn"/>
                <div className="bottom"> </div>
            </form>
        )
    }
}
