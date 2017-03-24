'use strict'


import React from 'react';
import { Link} from 'react-router';



class MainLayout extends React.Component{

    static defaultProps = {
        links:[{name:'导航预览',url:'/preview'},
                {name:'主链接编辑',url:'/site-link'},
                {name:'副链接编辑',url:'/addon-link'},
                {name:'猜你喜欢编辑',url:'/guess-like'},
                {name:'其它网站链接编辑',url:'/other-link'},
                {name:'生活娱乐其它',url:'/tool-link'},
                {name:'头部新闻,链接',url:"/content-header",type:"daily"},

                {name:'左侧今日头条',url:'/left-daily',type:"daily"},
                {name:'左侧悬浮窗编辑',url:'/float-left',type:"daily"},
                {name:'左侧顶部新闻编辑',url:'/head-news',type:"daily"},
                {name:'左侧今日视频编辑',url:'/video-news',type:"daily"},
                {name:'左侧今日游戏编辑',url:'/game-news'},
                {name:'左侧今日购物编辑',url:'/shop-news',type:"weekly"},
                {name:'左侧今日生活编辑',url:'/life-news',type:"daily"},


                {name:'看视频编辑',url:'/video-section',type:"daily"},
                {name:'玩游戏编辑',url:'/game-section'},
                {name:'实惠购物编辑',url:'/shop-section',type:"weekly"},
                {name:'生活百科编辑',url:'/ency-section',type:"daily"},
                {name:'打发无聊编辑',url:'/boring-section',type:"daily"},
                {name:'轻松一刻编辑',url:'/fun-section',type:"daily"},
                {name:'网站部署',url:'/deploy',type:"deploy"}]
    };
    render(){
        return(
            <div className="layout">
                <header className="head">
                    <div className="logo">
                     <h1>笨虎导航后台编辑</h1>
                  </div>
                </header>

                <section className="container" >
                    <aside className="navs">
                        {this.props.links.map(function(link,index){
                            return <div className={"nav " + link.type} key={index}>
                                    <Link to={link.url} activeClassName="active">{link.name}</Link>
                                </div>
                        })}
                    </aside>
                    <div className="right-content" >
                        {this.props.children}
                    </div>
                </section>
            </div>
        )
    }


}


export default MainLayout
