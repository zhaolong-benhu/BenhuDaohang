import HeadSection from './head.js';
import SearchSection from './search-section.js';
import superagent from 'superagent';
import catch_render_error from './catch_error';
import React from 'react';
import {content_header_json} from './global';

@catch_render_error
class ContentHeader extends React.Component{

    state = {
        top_right_ads:{img:"",url:""},
        top_right:[],
        right:[],
        bottom:[]
    }

    componentDidMount(){
        superagent.get(content_header_json).end(function(err,res){
            if(!err){
                let data = JSON.parse(res.text).data;
                this.setState({top_right:data.top_right,right:data.right,bottom:data.bottom,top_right_ads:data.top_right_ads});
            }
        }.bind(this))
    }

    render(){
        return(
            <div>
                <HeadSection news={this.state.top_right} ads={this.state.top_right_ads}/>
                <SearchSection news={this.state.right} bottom_links={this.state.bottom}/>
            </div>
        )
    }

}

export default ContentHeader;
