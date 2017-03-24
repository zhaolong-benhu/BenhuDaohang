'use strict'


import React from 'react';
import superagent from 'superagent';

import {ency_section_json} from './global';


export default class EncySection extends React.Component{

    state = {
      modules:{
        other_labels_index:0,
        other_labels:[],
        other_labels_list:[],
        left_img_items:[],
        left_char_items:[],
        right_items:[]
      }
    };
    constructor(){
        super();
        superagent.get(ency_section_json).end(function(err,res){
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
        superagent.post(ency_section_json).set('Content-Type', 'application/json')
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

    handleRigthFirstLinkChange(index,type,e){
        let data = this.state.modules;
        data.right_items[index]["first_item"][type] = e.target.value;
        this.setState({modules:data});
    }
    handleRigthOtherLinkChange(index,value_index,type,e){
        let data = this.state.modules;
        data.right_items[index]["other_items"][value_index][type] = e.target.value;
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
    handleNameChange(index,e)
    {
        let data = this.state.modules;
        data.right_items[index].name = e.target.value;
        this.setState({modules:data});
    }
    render(){
        return(
            <form  className="ency-section" onSubmit={this.handleSubmit.bind(this)}>
              <div className="value" >
                  {this.state.modules.right_items.map(function(value,index){
                    return <div className="right-items" key={index}>
                               <div className="link">
                                   <div className="text-desc cate-name">类别名称：</div>
                                   <input type="text" value={value.name} onChange={this.handleNameChange.bind(this,index)}/>
                               </div>
                               <div className="link">
                                   <div className="text-desc">右{index+1}链接：</div>
                                   <input type="text" value={value.first_item.title} onChange={this.handleRigthFirstLinkChange.bind(this,index,'title')} placeholder="标题"/>
                                   <input type="text" value={value.first_item.url} onChange={this.handleRigthFirstLinkChange.bind(this,index,'url')} placeholder="链接地址"/>
                                   <input type="text" value={value.first_item.img} onChange={this.handleRigthFirstLinkChange.bind(this,index,'img')} placeholder="图片地址"/>
                               </div>
                               {value.other_items.map(function(data,value_index){
                                 return <div className="other-div link" key={value_index}>
                                           <input type="text" value={data.title} onChange={this.handleRigthOtherLinkChange.bind(this,index,value_index,'title')} placeholder="标题"/>
                                           <input type="text" value={data.url} onChange={this.handleRigthOtherLinkChange.bind(this,index,value_index,'url')} placeholder="链接地址"/>
                                        </div>
                               }.bind(this))}
                           </div>
                  }.bind(this))}
              </div>
              <div className="labels">
                  <div className="name">右上角标签：</div>
                  {this.state.modules.other_labels_list.map(function(value,index){
                    return  <div className="link" key={index}>
                              <div className="group-name">第{index+1}组：</div>
                              {value.other_labels.map(function(data,value_index){
                                return <div key={value_index}>
                                          <input type="text"  value={data.title} onChange={this.hadnleLabelsChange.bind(this,index,value_index,'title')} placeholder="标签标题"/>
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
