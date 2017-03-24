'use strict'


import React from 'react';
import superagent from 'superagent';

import {shop_news_json} from './global';


export default class ShopNews extends React.Component{

    state = {
      modules:{
        current_active:0,
        left_img_items:[{title:"",img:"",url:""}],
        left_char_items:[],
        shop_categories:[]
      }
    };
    constructor(){
        super();
        superagent.get(shop_news_json).end(function(err,res){
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
        superagent.post(shop_news_json).set('Content-Type', 'application/json')
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

    handleLinkChange(index,value_index,group,type,e){
        let data = this.state.modules;
        if (index == 0){
          data[group][value_index][type] = e.target.value;
          data.shop_categories[index][group] = data[group];
        }else{
          data.shop_categories[index][group][value_index][type] = e.target.value;
        }
        this.setState({modules:data});
    }
    handleNameChange(index,e)
    {
        let data = this.state.modules;
        data.shop_categories[index].name = e.target.value;
        this.setState({modules:data});
    }
    render(){
        return(
            <form  className="shop-news" onSubmit={this.handleSubmit.bind(this)}>
              <div className="value" >
                  {this.state.modules.shop_categories.map(function(value,index){
                    return <div className="right-items" key={index}>
                               <div className="link">
                                   <div className="text-desc">类别名称：</div>
                                   <input type="text" value={value.name} onChange={this.handleNameChange.bind(this,index)}/>
                               </div>
                               <div className="other-div link">
                                   <input type="text" value={value.left_img_items[0].title} onChange={this.handleLinkChange.bind(this,index,0,'left_img_items','title')} placeholder="标题"/>
                                   <input type="text" value={value.left_img_items[0].url} onChange={this.handleLinkChange.bind(this,index,0,'left_img_items','url')} placeholder="链接地址"/>
                                   <input type="text" value={value.left_img_items[0].img} onChange={this.handleLinkChange.bind(this,index,0,'left_img_items','img')} placeholder="图片地址"/>
                                   <div className="text-desc">(只有第一行第3个是图片地址,其他行第3个是标题颜色值)</div>
                                </div>
                               {value.left_char_items.map(function(data,value_index){
                                 return <div className="other-div link" key={value_index}>
                                           <input type="text" value={data.title} onChange={this.handleLinkChange.bind(this,index,value_index,'left_char_items','title')} placeholder="标题"/>
                                           <input type="text" value={data.url} onChange={this.handleLinkChange.bind(this,index,value_index,'left_char_items','url')} placeholder="链接地址"/>
                                           <input type="text" value={data.color} onChange={this.handleLinkChange.bind(this,index,value_index,'left_char_items','color')} placeholder="标题颜色,可选(orange,light-blue,light-green)"/>
                                        </div>
                               }.bind(this))}
                           </div>
                  }.bind(this))}
              </div>
              <input type="submit" value="保存" className="submit btn"/>
            </form>
        )
    }


}
