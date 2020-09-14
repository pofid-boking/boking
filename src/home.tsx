import * as React from 'react';
import './App.css'
import './home.css'
import Contract from './Contract/index'
import {HashRouter as Router,Switch,Route} from 'react-router-dom'
import service, { UserInfo } from './service/service';
import {formatDate, fromValue} from "./common/utils";
import i18 from  './i18';
export interface homex{
    
}
export interface homey{
    flag:boolean,
    flag2:boolean,
    // state2:any,
}
const baseTime:number = 30*60*7;

class Home extends React.Component<homex,homey>{
    constructor(props:homex){
        super(props)
        this.state={
            flag:true,
            flag2:false,
            // state2:""
        }
    }

    componentDidMount(){
        // this.getPeriods();
        
        // let interPeriods:any = sessionStorage.getItem("interPeriods")
        // if(interPeriods){
        //     clearInterval(interPeriods)
        // }
        //
        // interPeriods = setInterval(()=>{
        //     this.getPeriods();
        // },10*1000)
        // sessionStorage.setItem("interPeriods",interPeriods);
    }

    showflag(){
        this.setState({
          flag:false,
          flag2:true
        })
    }
    showF(){
      this.setState({
        flag:true,
        flag2:false
      })
    }
   
    
    goContract=(uri:any)=>{
         window.location.href= uri;
    }

    
    // getPeriods=()=>{
    //     service.weekInfos().then((res:any)=>{
    //         if(res && res[0] && res[0].period){
    //             const data:any = res[0].period;
    //             let state2:any = "";
    //             const nowTime:number = Math.ceil(Date.now()/1000)
    //             const endTime:number = Math.ceil(data[7].startTime*1 + baseTime)
    //             if(nowTime>= data[0].startTime*1 && nowTime <= endTime ){
    //                 state2 = i18.t("underway")
    //             }else if(nowTime<data[0].startTime*1){
    //                 state2 = i18.t("NoStart")
    //             }else if(nowTime>endTime){
    //                 state2= i18.t("Finished")
    //             }
    //             this.setState({
    //                 state2:state2
    //             })
    //         }
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    // }


    render(){
        // const {state2} = this.state;

        return(
            <Router>
            <div className="home_header">
                {/* {UserName} */}
                <div className="head">
                        <div className="btns">
                            <div className={this.state.flag?'left_':'leftf'} onClick={()=>this.showF()}>
                                POFID
                                <div className={this.state.flag?'oblique':'oblique2'}></div>
                            </div>
                            <div className={this.state.flag2?'right_':'rightf'} onClick={()=>this.showflag()}>
                                {i18.t('ElseContract')}
                                <div className={this.state.flag2?'tilted':'tilted2'}></div>
                            </div>
                        </div>
                        <div className="main">

                            <div className={this.state.flag?'showTop':'none'}>
                                <div className="Card_top" onClick={()=>this.goContract('#/contract')}>
                                    <div className="nones">{i18.t("BOKINGContract")}</div>
                                    <div className="flex">
                                        <div className="contents">
                                            <div className="boking_text">{i18.t('POFIDIntroduce')}</div>
                                        </div>
                                        {/*<div className="right_boking">*/}
                                        {/*    <button  className="icon" >*/}
                                        {/*        <img className="icons" src={require('./images/arrow_icon.png')} alt=""/>*/}
                                        {/*        <img className="icons" src={require('./images/arrow_icon.png')} alt=""/>*/}
                                        {/*    </button>*/}
                                        {/*</div>*/}
                                    </div>
                                    {/*<div className="ju_size">{state2}</div>*/}
                                </div>
                            </div>

                            <div className={this.state.flag2?'showTop':'none'}>
                                    <div className="Card_top" onClick={()=>{
                                        window.location.href = "http://coral-dex.github.io/dex?"+Date.now()
                                    }}>
                                        <div className="nones">CORAL&ensp;DEX</div>
                                        <div className="flex">
                                            <div className="contents">
                                                <div className="boking_text">{i18.t('CORALDEXIntroduce')}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Card_top" onClick={()=>{
                                        window.location.href = "https://uhexio.gitee.io/sero-sloth/?"+Date.now()
                                    }}>
                                        <div className="nones">SLOTH</div>
                                        <div className="flex">
                                            <div className="contents">
                                                <div className="boking_text">{i18.t('Sloth')}</div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div> 
                </div> 

                <Switch>
                    <Route path="/contract" component={Contract}/>
                </Switch>
            </div>
            </Router>
        )
    }
}
export default Home;