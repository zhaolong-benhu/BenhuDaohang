'use strict';


import React from 'react';
import catch_render_error from './catch_error';
import superagent from 'superagent';
import jsonp from './jsonp';
import {sina_weather_url} from './global';
import {brief_news_json} from './global';


class Splitline extends React.Component {
  render(){
    return(
      <div className="splitline">
      </div>
    )
  }
}
@catch_render_error
class SiteLogo extends React.Component{

    render(){
        return(
            <div className="logo" title="123.benhu网址导航">
            </div>
        )
    }

}

class Calender extends React.Component{
    state = {
        date:'',
        day:'',
        lunar_date:''
    };
    componentDidMount(){
        var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
        let Stamp = new Date();
        let date = "" + (Stamp.getMonth() + 1) + '月' + Stamp.getDate() + '日';
        let day = dayNames[Stamp.getDay()];
        this.setState({date:date,day:day})
        superagent.get('http://api.tuijs.com/solarToLunar').use(jsonp).query({callbackParam:'callback'}).end(function(err,res){
            if(!err)
            {
                let data = res.body;
                this.setState({lunar_date:data.lunarMonthName +data.lunarDayName })
            }

        }.bind(this))
    }
    render(){
        return(
            <div className="calender">
                <a href="https://www.baidu.com/s?word=日历" target="_blank">
                    <div>{this.state.date}</div>
                    <div>{this.state.day}</div>
                </a>
                <a href="https://www.baidu.com/s?word=日历" target="_blank">
                    <div>农历</div>
                    <div>{this.state.lunar_date}</div>
                </a>
            </div>
        )
    }
}

class Weather extends React.Component{

    static defaultProps = {
        weather_url:sina_weather_url,
        tianqi:{
          "晴":"/images/weather/qing.png",
          "多云":"/images/weather/duoyun.png",
          "阴":"/images/weather/yin.png",
          "阵雨":"/images/weather/zhenyu.png",
          "雷阵雨":"/images/weather/leizhenyu.png",
          "雷阵雨伴有冰雹":"/images/weather/leizhenyubanyoubingbao.png",
          "冻雨":"/images/weather/dongyu.png",
          "小雨":"/images/weather/xiaoyu.png",
          "中雨":"/images/weather/zhongyu.png",
          "大雨":"/images/weather/dayu.png",
          "暴雨":"/images/weather/baoyu.png",
          "大暴雨":"/images/weather/dabaoyu.png",
          "特大暴雨":"/images/weather/tedabaoyu.png",
          "小到中雨":"/images/weather/zhongyu.png",
          "中到大雨":"/images/weather/dayu.png",
          "大到暴雨":"/images/weather/baoyu.png",
          "暴雨到大暴雨":"/images/weather/dabaoyu.png",
          "大暴雨到特大暴雨":"/images/weather/tedabaoyu.png",
          "雨夹雪":"/images/weather/yujiaxue.png",
          "阵雪":"/images/weather/zhenxue.png",
          "小雪":"/images/weather/xiaoxue.png",
          "中雪":"/images/weather/zhongxue.png",
          "大雪":"/images/weather/daxue.png",
          "暴雪":"/images/weather/baoxue.png",
          "小到中雪":"/images/weather/zhongxue.png",
          "中到大雪":"/images/weather/daxue.png",
          "大到暴雪":"/images/weather/baoxue.png",
          "雾":"/images/weather/wu.png",
          "霾":"/images/weather/mai.png",
          "浮尘":"/images/weather/fuchen.png",
          "扬沙":"/images/weather/fuchen.png",
          "沙尘暴":"/images/weather/shachenbao.png",
          "强沙尘暴":"/images/weather/shachenbao.png",
        }
    };

    state = {
        weather:false
    };

    constructor(props){
        super(props);
        // loadScript(props.weather_url, function () {
        //     console.log(SWther.w);
        // });
        superagent.get(props.weather_url).end(function(err, res){
            if(!err)
            {
                var data = JSON.parse(res.text)['HeWeather data service 3.0'][0];

                this.setState({
                    weather:true,
                    city:data.basic.city,
                    today:{max:data.daily_forecast[0].tmp.max,min:data.daily_forecast[0].tmp.min,name:data.daily_forecast[0].cond.txt_d},
                    tomorrow:{max:data.daily_forecast[1].tmp.max,min:data.daily_forecast[1].tmp.min,name:data.daily_forecast[1].cond.txt_d}
                });
                // console.log(this.state);
            }
        }.bind(this));
    }
    render(){
        if(this.state.weather)
        {

          var today_image = this.props.tianqi[this.state.today.name];
          if(!today_image)
          {
            today_image = "/images/weather/duoyun.png";
          }
          var tomorrow_image = this.props.tianqi[this.state.tomorrow.name];
          if(!tomorrow_image)
          {
            tomorrow_image = "/images/weather/duoyun.png";
          }
            return(
                <div className="weather">
                    <div className="city">{this.state.city}</div>
                    <div className="today date" title={"今天"+this.state.today.name+" "+this.state.today.min+"℃~"+this.state.today.max+"℃"}>
                        <div className="icon" style={{backgroundImage:'url(' + today_image + ')'}}></div>
                        <div className="info">
                            <div className="brief" >
                                <a href="http://www.baidu.com/s?wd=%E5%A4%A9%E6%B0%94" target="_blank">今 {this.state.today.name}</a>
                                </div>
                            <div className="temperature">{this.state.today.min}℃~{this.state.today.max}℃</div>
                        </div>
                    </div>
                    <div className="tomorrow date" title={"明天"+this.state.tomorrow.name+" "+this.state.tomorrow.min+"℃~"+this.state.tomorrow.max+"℃"}>
                        <div className="icon" style={{backgroundImage:'url(' + tomorrow_image + ')'}}></div>
                        <div className="info">
                            <div className="brief">
                                <a href="http://www.baidu.com/s?wd=%E5%A4%A9%E6%B0%94" target="_blank">明 {this.state.tomorrow.name}</a>
                                </div>
                            <div className="temperature">{this.state.tomorrow.min}℃~{this.state.tomorrow.max}℃</div>
                        </div>
                    </div>

                </div>
            )
        }
        else{
            return <div className="weather"></div>
        }

    }
}
@catch_render_error
class BriefNews extends React.Component{

    state = {

    }
    static defaultProps={
        news:[],
        ads:{image_url:"",url:""}
    }
    constructor(){
        super();
        // superagent.get(brief_news_json).set('Accept', 'application/json').end(function(err,res){
        //     if(!err){
        //         var data = JSON.parse(res.text);
        //         this.setState({modules:data.modules});
        //     }
        // }.bind(this));
    }
    render(){

        return(
            <div className="right-content">
                <div className="news">
                    {this.props.news.map(function(data,index){
                        return <a  key={"news_" + index} href={data.url} target="_blank">{data.title}</a>
                    })}
                </div>
                <a className="ads" href={this.props.ads.url} target="_blank">
                    <img src={this.props.ads.image_url} title="虎虎商城" />
                </a>
            </div>

        )
    }
}

export default class Header extends React.Component{

    render(){
        return(
          <div>
            <Splitline />
            <section className="head">
                <SiteLogo />
                <Calender />
                <Weather />
                <BriefNews ads={this.props.ads} news={this.props.news}/>
            </section>
            <Splitline />

          </div>

        )
    }


}
