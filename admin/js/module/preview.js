'use strict'

import React from 'react';

import {getDocHeight} from './global';

export default class PreviewPage extends React.Component{
    componentDidMount(){

    }

    componentDidMount(){

        this.refs.preview.style.height = getDocHeight() -50 + "px";
        document.body.style.overflow = "hidden";

    }
    render(){

        return(
                <div className="preview-page" ref="preview" id="preview">
                    <iframe src="/preview" style={{width:"100%",height:"100%"}}></iframe>
                </div>
        )
    }
}
