
import React from 'react';
import superagent from 'superagent';
import {content_header_json} from "./global";


export default class ContentHeader extends React.Component{
    state = {
        top_right_ads:{},
        top_right:[],
        right:[],
        bottom:[]
    };
    constructor(){
        super();
        superagent.get(content_header_json).end(function(err,res){
            if(!err){
                var data = JSON.parse(res.text).data;
                this.setState({top_right_ads:data.top_right_ads,top_right:data.top_right,right:data.right,bottom:data.bottom});
            }
        }.bind(this));
    }

    componentDidMount(){

        document.body.style.overflow = "auto";
    }
    handleSubmit(e){
        e.preventDefault();

        superagent.post(content_header_json).set('Content-Type', 'application/json')
        .accept('application/json').send({json:this.state}).end(function(err,res){
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

    handleLinkChange(index,group,type,e){
        let data =this.state[group];
        data[index][type]= e.target.value;
        this.setState(data);
    }
    handleAdsChange(type,e){
        let data =this.state.top_right_ads;
        data[type] = e.target.value;
        this.setState(data);
    }
    render(){
        return (
            <form className="content-header" onSubmit={this.handleSubmit.bind(this)}>

                <div className="top-right-ads">
                    <div className="title">
                        右上角广告
                    </div>
                    <div className="img">
                        <div className="label">图片</div>
                        <input type="text" value={this.state.top_right_ads.image_url} onChange={this.handleAdsChange.bind(this,'image_url')} />
                    </div>
                    <div className="url">
                        <div className="label">链接</div>
                        <input type="text" value={this.state.top_right_ads.url} onChange={this.handleAdsChange.bind(this,'url')}/>
                    </div>
                </div>
                <div className="top-right">
                    <div className="title">
                        右上角广告
                    </div>
                    <div className="links">
                        {this.state.top_right.map(function(data,index){
                            return <div className="link" key={index}>

                                <input type="text" value={data.title} onChange={this.handleLinkChange.bind(this,index,'top_right','title')} />
                                <input type="text" value={data.url} onChange={this.handleLinkChange.bind(this,index,'top_right','url')}/>

                            </div>
                        }.bind(this))}
                    </div>
                </div>

                <div className="right">
                    <div className="title">
                        右侧热点
                    </div>
                    <div className="links">
                        {this.state.right.map(function(data,index){
                            return <div className="link" key={index}>

                                <input type="text" value={data.title} onChange={this.handleLinkChange.bind(this,index,'right','title')}/>
                                <input type="text" value={data.url} onChange={this.handleLinkChange.bind(this,index,'right','url')}/>

                            </div>
                        }.bind(this))}
                    </div>
                </div>

                <div className="bottom">
                    <div className="title">
                        搜索栏底部链接
                    </div>
                    <div className="links">
                        {this.state.bottom.map(function(data,index){
                            return <div className="link" key={index}>

                                <input type="text" value={data.title} onChange={this.handleLinkChange.bind(this,index,'bottom','title')}/>
                                <input type="text" value={data.url} onChange={this.handleLinkChange.bind(this,index,'bottom','url')}/>

                            </div>
                        }.bind(this))}
                    </div>
                </div>
                <input type="submit" value="保存" className="submit btn"/>

            </form>
        )
    }
}
