'use strict'


import React from 'react';
import superagent from 'superagent';

import {fun_section_json} from './global';


export default class FunSection extends React.Component{

    state = {
      modules:{
        "current_active":0,
        "other_labels_index":0,
        "fun_categories":[],
        "other_labels":[],
        "other_labels_list":[],
        "left_fun_items":[{"title":"","img":"","url":""}],
        "right_fun_items":[{"title":"","img":"","url":""}]
      }
    };
    constructor(){
        super();
        superagent.get(fun_section_json).end(function(err,res){
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
        superagent.post(fun_section_json).set('Content-Type', 'application/json')
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

    handleLeftLinkChange(index,type,e){
        let data = this.state.modules;
        if (index == 0){
          data.left_fun_items[0][type] = e.target.value;
          data.fun_categories[index].left_fun_items = data.left_fun_items;
        }else{
          data.fun_categories[index].left_fun_items[0][type] = e.target.value;
        }
        this.setState({modules:data});
    }
    handleRigthLinkChange(index,value_index,type,e){
        let data = this.state.modules;
        if (index == 0){
          data.right_fun_items[value_index][type] = e.target.value;
          data.fun_categories[index].right_fun_items = data.right_fun_items;
        }else{
          data.fun_categories[index].right_fun_items[value_index][type] = e.target.value;
        }
        this.setState({modules:data});
    }
    handleNameChange(index,e)
    {
        let data = this.state.modules;
        data.fun_categories[index].name = e.target.value;
        this.setState({modules:data});
    }
    hadnleLabelsChange(index,value_index,type,e){
      let data = this.state.modules;
      if (index == 0){
        data.other_labels[value_index][type] = e.target.value;
        data.other_labels_list[index].other_labels = data.other_labels;
      }else{
        data.other_labels_list[index].other_labels[value_index][type] = e.target.value;
      }
      this.setState({modules:data});
    }
    render(){
        return(
            <form  className="fun-section" onSubmit={this.handleSubmit.bind(this)}>
              {this.state.modules.fun_categories.map(function(value,index){
                  return <div className="value" key={index}>
                            <div className="category">
                                <div>类别名称：</div>
                                <input type="text" value={value.name} onChange={this.handleNameChange.bind(this,index)}/>
                            </div>
                            <div className="items">
                                <div className="left-link link">
                                    <input type="text" value={value.left_fun_items[0].title} onChange={this.handleLeftLinkChange.bind(this,index,'title')} placeholder="标题"/>
                                    <input type="text" value={value.left_fun_items[0].img} onChange={this.handleLeftLinkChange.bind(this,index,'img')} placeholder="图片地址"/>
                                    <input type="text" value={value.left_fun_items[0].url} onChange={this.handleLeftLinkChange.bind(this,index,'url')} placeholder="链接地址"/>
                                </div>
                                {value.right_fun_items.map(function(data,value_index){
                                    return <div className="link" key={value_index}>
                                        <input type="text" value={data.title} onChange={this.handleRigthLinkChange.bind(this,index,value_index,'title')} placeholder="标题"/>
                                        <input type="text" value={data.img} onChange={this.handleRigthLinkChange.bind(this,index,value_index,'img')} placeholder="图片地址"/>
                                        <input type="text" value={data.url} onChange={this.handleRigthLinkChange.bind(this,index,value_index,'url')} placeholder="链接地址"/>

                                    </div>
                                }.bind(this))}
                            </div>
                        </div>
              }.bind(this))}
              <div className="labels">
                  <div className="name">右上角标签：</div>
                  {this.state.modules.other_labels_list.map(function(value,index){
                    return  <div className="link" key={index}>
                              <div className="group-name">第{index+1}组：</div>
                              {value.other_labels.map(function(data,value_index){
                                return <div key={value_index}>
                                          <input type="text" value={data.title} onChange={this.hadnleLabelsChange.bind(this,index,value_index,'title')} placeholder="标签标题"/>
                                          <input type="text" value={data.color} onChange={this.hadnleLabelsChange.bind(this,index,value_index,'color')} placeholder="标题颜色,可选(orange,light-blue)"/>
                                          <input type="text" value={data.url} onChange={this.hadnleLabelsChange.bind(this,index,value_index,'url')} placeholder="链接地址"/>
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
