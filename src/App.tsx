import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from 'antd-mobile';
import service from './service/service'
import Contract from './Contract/index'
import Home from './home'
import './i18'
import {HashRouter as Router,NavLink,Route,Switch,Redirect} from 'react-router-dom';
export interface Appx{
  history?:any,
}
export interface Appy{
  flag:boolean,
  flag2:boolean,
  str?:string,
  num?:Array<number>,
  str2?:string,
  title:Array<any>,
  contents:string,

}
class App extends React.Component<Appx,Appy>{
  constructor(props:Appx){
    super(props)
    this.state={
      flag:true,
      flag2:false,
      str:'boking合约',
      str2:'CORAL',
      title:[1,2,3],
      contents:'booking合约是一项长期金本为保障的去中心化智能合约理财，共享PFID不可限量的DEFI生态增长空间。'
    }
  }

  componentDidMount(): void {
    service.initDApp().catch()
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

  goPage=(uri:string)=>{
    window.location.href = uri;
  }




  render(){
    // var showtai:any = [];
    // this.state.title.map(item=>{
    //   showtai.push(
    //    <div>{'boking合约第'+item+'期'}</div>
    //   )
    // })
    return(
      <div className="App">
        <Router>
                <div className="header">
                  <div className="nav">
                  {/* <img src={require("./images/back_ground.png")} alt=""/> */}
                  {/* <img className="logo" src={require("./images/logo.png")} alt=""/> */}
                  <img className="logo" src={require('./images/header_logo.png')} alt=""/>
                  </div>
                </div>
                
              <Switch>
                <Route path="/contract" component={Contract} exact></Route>
                <Route path="/home" component={Home} exact></Route>
                <Redirect path="/"to="/home"/>
              </Switch>
        </Router>
      </div>
    )
  }

}


export default App;
