'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import catch_render_error from './catch_error';

@catch_render_error
export default class ImageSlider extends React.Component{
    state = {
        current_select: 0,
        slide_items:[{title:"生活百科1,姐可是有故事的人",img:"url(http://www.114la.com/static/upd/201602/24143359cfdba259.jpg)",url:"https://www.taobao.com"},
                     {title:"生活百科2,姐可是有故事的人",img:"url(http://www.114la.com/static/upd/201602/241425541755b568.jpg)",url:"https://www.taobao.com"},
                     {title:"生活百科3,姐可是有故事的人",img:"url(http://www.114la.com/static/page/meinv/images/meinv2.jpg)",url:"https://www.taobao.com"}]

    };
    prev_btn_click (){
      var count = this.state.slide_items.length;
      if (count <= 0){
        return;
      }
      if (this.state.current_select <= 0){
        this.setState({current_select: count-1});
      }
      else{
        this.setState({current_select: --this.state.current_select});
      }
    }
    next_btn_click (){
      var count = this.state.slide_items.length;
      if (count <= 0){
        return;
      }
      if (this.state.current_select+ 1 < count){
        this.setState({current_select: ++this.state.current_select});
      }
      else{
        this.setState({current_select: 0});
      }
    }
    render () {
      return (
          <div className="image-slider">
            <div className="slides" >
              {this.state.slide_items.map(function(value,index){
                var cls = this.state.current_select == index ? "slide-link selected":"slide-link";
                return <a className={cls} key={'slide_items_'+ index} href={value.url} target="_blank" style={{backgroundImage:value.img}}>
                          <span className="slide-title" >{value.title}</span>
                       </a>
              }.bind(this))}
            </div>
            <div className="slide-control">
              <a className="slide-prev-btn slide-btn" href="javascript:void(0)" onClick={this.prev_btn_click.bind(this)}></a>
              <a className="slide-next-btn slide-btn" href="javascript:void(0)" onClick={this.next_btn_click.bind(this)}></a>
            </div>
          </div>
      )
    }
}
