'use strict'


import catch_render_error from './catch_error';
import React from 'react';

import {float_right_json} from './global';
import superagent from 'superagent';

@catch_render_error
export default class FloatRight extends React.Component{
    state={
        modules:{
          ads:"",
          links:[]
        },
        gotodown:true
    };
    componentDidMount() {
         window.addEventListener('scroll', this.handleScroll.bind(this));
        // window.addEventListener('scroll',this.onScroll.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll(event) {

      var afterScrollTop = document.body.scrollTop;

      if(afterScrollTop < 2500)
      {
            //  alert("已滑倒顶部...");
            this.setState({gotodown:true});
      }
      else
      {
          //  alert("已滑倒底部...");
           this.setState({gotodown:false});
      }
    }
      handleClick()
      {
        //  var afterScrollTop = document.body.scrollTop;

        if(this.state.gotodown)
        {
           document.body.scrollTop = 4000;

          // while(afterScrollTop<4000)
          // {
          //    document.body.scrollTop = afterScrollTop + 20 ;
          // }
        }
        else
        {
          document.body.scrollTop = 0;
        }
      }

    constructor(){
        super();
        superagent.get(float_right_json).set('Accept', 'application/json').end(function(err,res){
            if(!err){
                var data = JSON.parse(res.text);
                this.setState({modules:data.modules});
            }
        }.bind(this));
    }
    render(){
        return (
            <div className="float-right">
                <div className="content">
                    <a className="ads" target="_blank" href="http://sale.jd.com/act/yxTcNHtnple4rRO5.html?cu=true&utm_source=baidu-search&utm_medium=cpc&utm_campaign=t_262767352_baidusearch&utm_term=28511572066_0_d3065fd65c104f82a86e66c0d8dcf9dd">
                        <img src={this.state.modules.ads} />
                    </a>
                    {this.state.modules.links.map(function(data,index){
                        return <a href={data.url} target="_blank" className="link" key={'float_right_' + index}>{data.name}</a>
                    })}


                    <a className={this.state.gotodown?'down':'up'} onClick={this.handleClick.bind(this)}>
                    </a>
                </div>


            </div>
        )
    }
}
