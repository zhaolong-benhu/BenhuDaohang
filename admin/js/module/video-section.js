'use strict'


import React from 'react';
import superagent from 'superagent';

import {video_section_json} from './global';


export default class GameSection extends React.Component{

    state = {
      modules: {
         current_active:0,
         other_labels_index:0,
         left_img_items:{title:"",img:"",url:""},
         left_char_items:[],
         right_first_items:[{title:"",ad_title:"",img:"",url:""}],
         right_other_items:[],
         video_categories:[],
         other_labels:[],
         other_labels_list:[]
      }
    };
    constructor(){
        super();
        superagent.get(video_section_json).end(function(err,res){
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
        superagent.post(video_section_json).set('Content-Type', 'application/json')
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

    handleLeftImgLinkChange(type,e){
        let data = this.state.modules;
        data.left_img_items[type] = e.target.value;
        this.setState({modules:data});
    }
    handleLeftCharLinkChange(index,type,e){
        let data = this.state.modules;
        data.left_char_items[index][type] = e.target.value;
        this.setState({modules:data});
    }
    handleRigthLinkChange(index,value_index,group,type,e){
        let data = this.state.modules;
        if (index == 0){
          data[group][value_index][type] = e.target.value;
          data.video_categories[index][group] = data[group];
        }else{
          data.video_categories[index][group][value_index][type] = e.target.value;
        }
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
        data.video_categories[index].name = e.target.value;
        this.setState({modules:data});
    }
    render(){
        return(
            <form  className="video-section" onSubmit={this.handleSubmit.bind(this)}>
              <div className="value" >
                  <div className="link">
                      <div className="text-desc">左边链接：</div>
                      <input type="text" value={this.state.modules.left_img_items.title} onChange={this.handleLeftImgLinkChange.bind(this,'title')} placeholder="标题"/>
                      <input type="text" value={this.state.modules.left_img_items.url} onChange={this.handleLeftImgLinkChange.bind(this,'url')} placeholder="链接地址"/>
                      <input type="text" value={this.state.modules.left_img_items.img} onChange={this.handleLeftImgLinkChange.bind(this,'img')} placeholder="图片地址"/>
                  </div>
                  {this.state.modules.left_char_items.map(function(value,index){
                    return <div className="other-div link" key={index}>
                              <input type="text" value={value.title} onChange={this.handleLeftCharLinkChange.bind(this,index,'title')} placeholder="标题"/>
                              <input type="text" value={value.url} onChange={this.handleLeftCharLinkChange.bind(this,index,'url')} placeholder="链接地址"/>
                           </div>
                  }.bind(this))}
                  {this.state.modules.video_categories.map(function(value,index){
                    return <div className="right-items" key={index}>
                               <div className="link">
                                   <div className="text-desc cate-name">右边类名：</div>
                                   <input type="text" value={value.name} onChange={this.handleNameChange.bind(this,index)}/>
                               </div>
                               <div className="other-div link">
                                   <input type="text" value={value.right_first_items[0].title} onChange={this.handleRigthLinkChange.bind(this,index,0,'right_first_items','title')} placeholder="视频名称"/>
                                   <input type="text" value={value.right_first_items[0].ad_title} onChange={this.handleRigthLinkChange.bind(this,index,0,'right_first_items','ad_title')} placeholder="标题"/>
                                   <input type="text" value={value.right_first_items[0].url} onChange={this.handleRigthLinkChange.bind(this,index,0,'right_first_items','url')} placeholder="链接地址"/>
                                   <input type="text" value={value.right_first_items[0].img} onChange={this.handleRigthLinkChange.bind(this,index,0,'right_first_items','img')} placeholder="图片地址"/>
                                </div>
                               {value.right_other_items.map(function(data,value_index){
                                 return <div className="other-div link" key={value_index}>
                                           <input type="text" value={data.title} onChange={this.handleRigthLinkChange.bind(this,index,value_index,'right_other_items','title')} placeholder="视频名称"/>
                                           <input type="text" value={data.ad_title} onChange={this.handleRigthLinkChange.bind(this,index,value_index,'right_other_items','ad_title')} placeholder="标题"/>
                                           <input type="text" value={data.url} onChange={this.handleRigthLinkChange.bind(this,index,value_index,'right_other_items','url')} placeholder="链接地址"/>
                                           <input type="text" value={data.img} onChange={this.handleRigthLinkChange.bind(this,index,value_index,'right_other_items','img')} placeholder="图片地址"/>
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
