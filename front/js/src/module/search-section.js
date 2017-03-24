'use strict';

import React from 'react';

import catch_render_error from './catch_error';

import superagent from 'superagent';
import jsonp from './jsonp';
import {search_top_news} from './global';


@catch_render_error
class SearchInput extends React.Component{
    state = {

            keywords_enable:false,
            keywords:[],
            keywords_hot:false,
            engine_index:0,
            link_index:0,
            sugs:[],
            sugs_show:false,
            sugs_index:0,
            keywords_show:false,
            engines:[{
                type:'网页',
                links:[{
                    name:'百度',
                    icon:'/images/baidu-logo.png',
                    url:'https://www.baidu.com/s?wd='
                },{
                    name:'百度',
                    icon:'/images/baidu-logo.png',
                    url:'https://www.baidu.com/s?w='
                }]
            },{
                type:'视频',
                links:[{
                    name:'优酷',
                    icon:'/images/youku-logo.png',
                    url:'http://www.soku.com/v?keyword='
                }]
            },{
                type:'音乐',
                links:[{
                    name:'音乐',
                    icon:'/images/qq-logo.png',
                    url:'https://www.baidu.com/?wd='
                }]
            },{
                type:'图片',
                links:[{
                    name:'百度',
                    icon:'/images/baidu-img-logo.png',
                    url:'http://image.baidu.com/search/index?tn=baiduimage&word='
                }]
            },{
                type:'汽车',
                links:[{
                    name:'汽车之家',
                    icon:'/images/qiche-logo.png',
                    url:'http://sou.autohome.com.cn/zonghe?q='
                }]
            },{
                type:'地图',
                links:[{
                    name:'百度',
                    icon:'/images/baidu-ditu-logo.png',
                    url:'http://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D'
                }]
            },{
                type:'购物',
                links:[{
                    name:'淘宝',
                    icon:'/images/taobao-logo.png',
                    url:'https://s.taobao.com/search?q='
                }]
            }]
    };
    static defaultProps = {
            fixed:false,
            suggestion_url:'http://suggestion.baidu.com/su',
            top_news_url:search_top_news,
            bottom_links:[]
    };
    constructor(props){
        super(props)
        try{
            superagent.get(props.top_news_url).end(function(err, res){
                if(!err)
                {
                    var data = JSON.parse(res.text);
                    if(data.errorcode == 0)
                    {
                        this.setState({keywords:data.keywords,keywords_enable:true,keywords_hot:true})
                    }
                }
            }.bind(this));
        }
        catch(error){
            console.error(error);
        }
    }

    componentDidMount(){
        window.addEventListener('click',this.handleDocumentClick.bind(this));
    }
    handleDocumentClick()
    {
        if(this.state.keywords_show == true){
            this.setState({keywords_show:false});
        }
        if(this.state.sugs_show)
        {
            this.setState({sugs_show:false})
        }
    }
    handleLinkClick(index){
        this.setState({engine_index:index,link_index:0});
    }
    handleInputChange(){
        let text = this.refs.input.value;
        if(text.length != 0){
            superagent.get(this.props.suggestion_url).query({wd:text}).use(jsonp).end(function(err, res){
                if(!err)
                {
                    this.setState({sugs:res.body.s,sugs_show:true,sugs_index:-1});
                }
            }.bind(this));
        }
    }
    handleInputKeydown(e){
        // this.setState({sugs_show:false});
        if(e.keyCode == 40)
        {
            if(this.state.sugs_show && (this.state.sugs.length != 0))
            {
                let cur = (this.state.sugs_index + 1)%this.state.sugs.length;
                e.target.value =  this.state.sugs[cur];
                this.setState({sugs_index:cur});
            }
        }
        else if(e.keyCode == 38){
            e.preventDefault();
            if(this.state.sugs_show && (this.state.sugs.length != 0))
            {
                let cur = (this.state.sugs_index - 1 + this.state.sugs.length)%this.state.sugs.length;
                e.target.value =  this.state.sugs[cur];
                this.setState({sugs_index:cur});
            }
        }
    }
    handleSubmit(e){
        e.preventDefault();
        let url = this.state.engines[this.state.engine_index].links[0].url;
        window.open(url + this.refs.input.value,"_blank");


    }
    handleDropdown(e){

        e.preventDefault();
        e.stopPropagation();
        this.setState({keywords_show:!this.state.keywords_show,keywords_hot:false});
    }

    handleSugsClick(data){
        this.refs.input.value = data;
        let url = this.state.engines[this.state.engine_index].links[0].url;
        window.open(url + data,"_blank");

    }

    handleHotClick(data){
        this.refs.input.value = data;
        let url = this.state.engines[this.state.engine_index].links[0].url;
        window.open(url + data,"_blank");

    }
    render(){
        var icon = 'url(' +  this.state.engines[this.state.engine_index].links[this.state.link_index].icon + ')';
        return(
            <div className="search-input" >
                <a href="http://www.baidu.com" target="_blank"  className="search-logo" style={{backgroundImage:icon}}></a>
                <div className="content">
                    <div className="links">
                        {this.state.engines.map(function(data,index){
                            if(this.props.fixed == false)
                            {
                                return <a href="javascript:void(0)" key={'links_' + index }
                                className={this.state.engine_index == index?'selected':''}
                                onClick={this.handleLinkClick.bind(this,index)}>{data.type}</a>
                            }
                        }.bind(this))}
                    </div>
                    <form className="input-area"  target="_blank" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="input">
                            <input type="text"  ref="input" name="word" autoComplete="off"
                            onKeyDown={this.handleInputKeydown.bind(this)}
                            onChange={this.handleInputChange.bind(this)}/>
                            {(()=>{
                                if(this.state.keywords_enable == true && this.state.engine_index == 0){
                                    if(this.state.keywords_hot)
                                    {
                                        return <div className='dropdown-hot' onClick={this.handleDropdown.bind(this)}>4</div>
                                    }
                                    else{
                                        return <div className='dropdown' onClick={this.handleDropdown.bind(this)}></div>
                                    }
                                }
                            })()}

                            {(()=>{
                                if(this.state.sugs_show)
                                {
                                    return <div className="suggestion" href="javascript:void(0)">

                                        {this.state.sugs.map(function(data,index){
                                            return <div className="item" key={'sugs_' + index} onClick={this.handleSugsClick.bind(this,data)}>
                                                {data}
                                            </div>
                                        }.bind(this))}
                                    </div>

                                }
                            })()}
                            {(()=>{
                                if(this.state.keywords_show)
                                {
                                    return <a className="keywords" href="javascript:void(0)">
                                        {this.state.keywords.map(function(data,index){
                                            if(index < 10)
                                            {
                                                let number_class = index <3?"number  hot":"number";
                                                let is_new = data.isNew==1?<div className="new">new!</div>:"";
                                                return <div className="item" key={'keywords_' + index} onClick={this.handleHotClick.bind(this,data.keyword)}>
                                                    <div className={number_class} >{index+1}</div>
                                                    <div className="description">{data.keyword}</div>
                                                    {is_new}
                                                </div>
                                            }

                                        }.bind(this))}
                                    </a>

                                }
                            })()}

                        </div>
                        <input type="submit" className="search-btn" value="搜索"/>
                    </form>
                    <div className="bottom-links">
                    {(()=>{
                      if(this.props.fixed == false)
                      {
                        return <a className="search-bg" target="_blank" href="http://www.taobao.com"></a>
                      }
                    })()}
                      {this.props.bottom_links.map(function(value,index){
                          if(this.props.fixed == false)
                          {
                            return <a href={value.url} target="_blank" key={'bottom_links_' + index}>{value.title}</a>
                          }
                      }.bind(this))}
                    </div>
                </div>
            </div>
        )
    }
}

class HomeNews extends React.Component{
    state = {
    };
    static defaultProps ={
        news_info:[]
    }
    render(){
          return (
            <div className="home-news">
                {this.props.news_info.map(function(value,index){
                    return <div className="item" key={'home_news_' + index}>
                              <span className="ico"></span>
                              <a href={value.url} target="_blank">{value.title}</a>
                          </div>
                })}
            </div>
          )

    }

}
export default class SearchSection extends React.Component{

    state = {
        fixed:false,
        offsetTop:0
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        this.setState({offsetTop:this.refs.area.offsetTop});
    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        let top = document.body.scrollTop ||  document.documentElement.scrollTop;
        let offsetTop = this.state.offsetTop;
        if(top >= offsetTop && this.state.fixed == false)
        {
            this.setState({fixed:true});
        }
        else if(top < offsetTop && this.state.fixed)
        {
            this.setState({fixed:false});

        }

    }
    render(){
        return(
            <section className={this.state.fixed?"fixed search-section":"search-section"} ref="area">
                <div className="container">
                    <SearchInput fixed={this.state.fixed} bottom_links={this.props.bottom_links}/>
                    <HomeNews news_info={this.props.news}/>
                </div>


            </section>

        )
    }




}
