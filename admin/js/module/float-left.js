'use strict'


import React from 'react';
import superagent from 'superagent';

import {floatleft_links_json} from './global';


export default class FloatLeftLinks extends React.Component{

    state = {
        leftaddons:{
          display:0,
          items:[]
        }
    };

    componentDidMount(){
        document.body.style.overflow = "auto";
    }

    constructor(){
        super();
        superagent.get(floatleft_links_json).end(function(err,res){
            if(!err){
                var data = JSON.parse(res.text);
                this.setState({leftaddons:data.leftaddons});
            }
        }.bind(this));
    }
    changeName(link_index,e){
        let value = e.target.value;
        let data = this.state.leftaddons;
        data.items[link_index].name = e.target.value;
        this.setState({leftaddons:data});
    }
    changeImageUrl(link_index,e){
        let value = e.target.value;
        let data = this.state.leftaddons;
        data.items[link_index].icon = e.target.value;
        this.setState({leftaddons:data});
    }
    changeLinkUrl(link_index,e){
        let value = e.target.value;
        let data = this.state.leftaddons;
        data.items[link_index].url = e.target.value;
        this.setState({leftaddons:data});
    }
    changeMainTitle(link_index,e){
        let value = e.target.value;
        let data = this.state.leftaddons;
        data.items[link_index].links = e.target.value;
        this.setState({leftaddons:data});
    }
    changeViceTitle(link_index,e){
      let value = e.target.value;
      let data = this.state.leftaddons;
      data.items[link_index].desc = e.target.value;
      this.setState({leftaddons:data});
    }
    changeTitleImageUrl(link_index,e){
      let value = e.target.value;
      let data = this.state.leftaddons;
      data.items[link_index].img = e.target.value;
      this.setState({leftaddons:data});
    }

    handleSubmit(e){
        e.preventDefault();
        superagent.post(floatleft_links_json).set('Content-Type', 'application/json')
        .accept('application/json').send({json:this.state.leftaddons}).end(function(err,res){
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
          <form className="floatleft-links" onSubmit={this.handleSubmit.bind(this)}>

              <div className="title">
                <div className="title1">显示名称</div>
                <div className="title2">显示图片</div>
                <div className="title3">跳转链接</div>
                <div className="title4">主标题</div>
                <div className="title5">副标题</div>
                <div className="title6">标题图片</div>
              </div>

              <div className="item">
                {this.state.leftaddons.items.map(function(link,link_index){
                      return <div className="link" key={link_index} >
                        <div>
                          <input type="text" value={link.name} className="name" onChange={this.changeName.bind(this,link_index)} />
                        </div>

                        <div>
                          <input type="text" value={link.icon} className="image" onChange={this.changeImageUrl.bind(this,link_index)} />
                        </div>

                        <div>
                           <input type="text" value={link.url} className="url" onChange={this.changeLinkUrl.bind(this,link_index)} />
                         </div>

                         <div>
                           <input type="text" value={link.links} className="maintitle" onChange={this.changeMainTitle.bind(this,link_index)} />
                         </div>

                         <div>
                           <input type="text" value={link.desc} className="vicetitle" onChange={this.changeViceTitle.bind(this,link_index)} />
                         </div>

                         <div>
                           <input type="text" value={link.img} className="titleimage" onChange={this.changeTitleImageUrl.bind(this,link_index)} />
                         </div>

                      </div>
                  }.bind(this))}
              </div>

              <input type="submit" value="保存" className="submit btn"/>
              <div className="bottom"> </div>
          </form>
        )
    }
}
