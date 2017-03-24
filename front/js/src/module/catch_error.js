'use strict'

import React from 'react';

let catch_render_error = function decorator(target){

    let f = target.prototype.render;
    target.prototype.render = function (){
        try{
            return f.apply(this,arguments);
        }
        catch(error){
            console.error(` error: render => ${error}`);
            return <div></div>
        }
    }
}


export default catch_render_error;
