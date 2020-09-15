import * as React from 'react';
import './index.css'
import {Modal, List, Toast, Button, WhiteSpace, WingBlank, Icon,Badge,Steps} from 'antd-mobile';
import service, {Phase, UserInfo} from '../service/service';
import {escapeStr, fromValue, toValue,formatDate} from '../common/utils';
import Countdown from 'count-down-react'
import copy from 'copy-text-to-clipboard';
import i18 from '../i18';
import Rule from './rule'

const alert = Modal.alert
const prompt = Modal.prompt;

const pdfStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
}

interface countdownParmas {
    days: any
    hours: any
    minutes: any
    seconds: any
}

const CoundownRenderer = (c: countdownParmas) => (
    <>
        {formatZero(c.days)} {i18.t("Day")} {formatZero(c.hours)}:{formatZero(c.minutes)}:{formatZero(c.seconds)}
    </>
)
function formatZero(v:any) {
    if(v<10){
        return "0"+v
    }
    return v
}
export interface Contx {
    homes?: string
}

export interface Conty {
    set_user: boolean,
    modal1: boolean,
    modal2: boolean,
    modal3: boolean,
    phase: Phase,
    account: any,
    accounts: Array<any>,
    info?: UserInfo,
}

const baseTime:number = 30*60*7;

class Contract extends React.Component<Contx, Conty> {
    constructor(props: Contx) {
        super(props)
        this.state = {
            set_user: false,
            modal1: false,
            modal2: false,
            modal3: false,
            phase: {seq: 1, startTime: 0, quantity: 0, totalSelled: 0, selledOfDay: []},
            account: {},
            accounts: [],
        }
    }

    componentDidMount() {
        this.getAccountList();
        this.getPhase();

        let interId:any = sessionStorage.getItem("interId");
        if(interId){
            clearInterval(interId)
        }
        interId = setInterval(()=>{
            this.getUserInfo();
            this.getPhase();
        },10*1000)
        sessionStorage.setItem("interId",interId)
    }

    getPhase = () => {
        service.weekInfos().then((res:any)=>{
            if(res && res[0] && res[0].period){
                const data:any = res[0].period;
                let itemTmp:any = "";
                const nowTime:number = Math.ceil(Date.now()/1000)
                const endTime:number = Math.ceil(data[7].startTime*1 + baseTime)
                // a hold round
                if(nowTime>= data[0].startTime*1 && nowTime <= endTime ){
                    for(let item of data){
                        const startTime:number = item.startTime*1;
                        const overTime = item.startTime * 1+ baseTime;
                        if(nowTime<=overTime && nowTime>=startTime){
                            itemTmp = item
                        }
                    }
                }else if(nowTime<data[0].startTime*1){
                    itemTmp = data[0]
                }else if(nowTime>endTime){
                    itemTmp = data[7]
                }

                this.setState({
                    phase: {
                        seq: parseInt(itemTmp[0]),
                        startTime: parseInt(itemTmp[1]),
                        quantity: parseInt(itemTmp[2]),
                        totalSelled: parseInt(itemTmp[3]),
                        selledOfDay: itemTmp[4]
                    }
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    getAccountList = () => {
        service.accountList().then((accounts: any) => {
            if (accounts && accounts.length > 0) {
                let selectAccount: any = localStorage.getItem('selectAccount');
                if (!selectAccount) {
                    selectAccount = accounts[0];
                } else {
                    selectAccount = JSON.parse(selectAccount);
                }
                this.setState({
                    accounts: accounts,
                    account: selectAccount
                })
                this.getUserInfo(selectAccount);
            }
        }).catch((e: any) => {
            console.error(e);
        })
    }

    getUserInfo = (account?: any) => {
        if(!account){
            account = this.state.account;
        }
        service.info(account.MainPKr).then(rest => {
            const data: any = service.convertResult(rest[0]);
            this.setState({
                info: {
                    own: data[0],
                    code: data[1],
                    referCode: data[2],
                    lastWithDrawTime: data[3],
                    createTime: data[4],
                    directUserCount:data[5],
                    indirectUserCount:data[6],
                    interest: data[7],
                    refer: data[8],
                    v1: data[9],
                    v2: data[10],
                    level: data[11],
                    v1Count: data[12],
                    canWithDraw: data[13]
                }
            })
        }).catch(e => {
            console.error(e)
        })
    }

    SET_user = (item: any) => {
        console.log(item);
        this.setState({
            set_user: false,
            modal1: false,
            account: item
        })
        this.getUserInfo(item);
    }

    cutUser(str: string) {
        if (str === 'user') {
            this.setState({modal1: true})
        } else if (str === 'rule') {
            this.setState({modal2: true})
        }

    }

    onClose = (nums: any) => {
        if (nums === 1) {
            this.setState({modal1: false})
        }
        if (nums === 2) {
            this.setState({modal2: false})
        }
    }

    getBalance = (cy: string) => {
        const {account} = this.state;

        if (account && account.Balance && account.Balance.size > 0) {
            if (account.Balance.has(cy)) {
                return fromValue(account.Balance.get(cy), 18).toFixed(3, 1)
            }
        }
        return "0.000"
    }

    buy = (code: any) => {
        const {account} = this.state;
        if (code) {
            service.buy(code, account, toValue(1, 18)).then(hash => {
                console.log(hash);
                // Toast.success(hash, 2);
            }).catch(e => {
                const err = typeof e == 'string' ? e : e.message;
                Toast.fail(err, 2);
            })
        }
    }

    withdraw = () => {
        const {account} = this.state;
        service.withDraw(account).then((hash: any) => {
            console.log(hash);
            // Toast.success(hash, 2);
        }).catch(e => {
            const err = typeof e == 'string' ? e : e.message;
            Toast.fail(err, 2);
        })
    }

    render() {

        const {accounts, account, info, phase} = this.state;
        let nowtime: any = Math.ceil(new Date().getTime() / 1000 );
        let endT: any = null;
        let nowDay = 0;
        let isSell = false;
        // not start
        const baseDayTime = 30 * 60;
        if(nowtime < phase.startTime){
            endT = phase.startTime
        }else{
            //started
            for(let i=0;i<7;i++){

                const dayEndTime:number = baseDayTime * (i+1) + phase.startTime;
                const dayStartTime:number = baseDayTime * i + phase.startTime;

                console.log("start=",new Date(dayStartTime*1000),"end=",new Date(dayEndTime*1000));

                if(nowtime<=dayEndTime && nowtime>=dayStartTime){
                    isSell = true;
                    endT = dayEndTime;
                    nowDay = i;
                    break
                }
            }
        }
        if(endT){
            let leftNumber = parseInt(phase.quantity) - parseInt(phase.selledOfDay[nowDay]);
            console.log("leftNumber>>>",leftNumber,nowtime,endT,nowtime<endT)
            if(leftNumber == 0){
                if(nowtime<endT){
                    isSell = false;
                }
            }
        }

        console.log("phase>>", phase);
        console.log("isSell=",isSell,"endT=",new Date(endT*1000),"nowDay=",nowDay);
        let detail:any = "";
        let title:any = "";
        if(info && info.code){
            title = i18.t("MyRecommend");
            detail=<div className="just_size cen" onClick={()=>{
                copy(info?.code)
                Toast.info(i18.t("Copy"),1.5)
            }}>{info&&info.code?info.code:""}&ensp;{info&&info.code?<Icon type={"iconcopy"}/>:""}</div>
        }else{
            if(!endT){
                title = i18.t("Finished")
                detail = ""
            }else{
                title = isSell?i18.t("going"):i18.t("countdown");
                detail = isSell?<div>

                    <div  onClick={() => prompt(
                        i18.t("Purchase"),
                        i18.t("ImportRecommend")+':',
                        [
                            {text: i18.t("Cancel")},
                            {text: i18.t("Submit"), onPress: v => this.buy(v)},
                        ],
                        'default',
                    )}>
                        <div><img className="pic" src={require("../images/poke.png")} alt=""/></div>
                        <div className="pokings">({i18.t("PokeRobPOKINGShare")})</div>
                    </div>
                    <div className="line"></div>
                    <div><a className="rule" onClick={() => this.cutUser('rule')}>{i18.t("LookRule")}</a></div>
                </div>:<div>
                    <div>
                        <div className="nth-child pokings">
                            <Countdown  //
                                date={endT * 1000}
                                renderer={CoundownRenderer}/>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div><a className="rule" onClick={() => this.cutUser('rule')}>{i18.t("LookRule")}</a></div>
                </div>
            }
        }

        return (
            <div className="bodys">
                <div className="pfid">

                    <WingBlank>
                        <WhiteSpace/>
                        <Modal
                            visible={this.state.modal1}
                            className='wingblank'
                            transparent
                            maskClosable={false}
                            title={i18.t("ClickCutUser")}
                            footer={[{
                                text: i18.t("CencalUser"), onPress: () => {
                                    this.onClose(1);
                                }
                            }]}>
                            <List style={{height: 200, overflow: 'scroll'}}>
                                {
                                    accounts && accounts.map((value: any) => {
                                        return <List.Item className="ListUser"  onClick={()=>this.SET_user(value)}>
                                            {value.Name} ({value.MainPKr})
                                        </List.Item>
                                    })
                                }
                            </List>
                        </Modal>
                    </WingBlank>

                    <WingBlank className="winkblans">
                        <WhiteSpace/>
                        <Modal
                            visible={this.state.modal2}
                            transparent
                            // className="wingblank"
                            maskClosable={true}
                            title={i18.t("RuleIntrodution")}
                            footer={[{
                                text: i18.t("HaveRead"), onPress: () => {
                                    this.onClose(2)
                                }
                            }]}>
                            <div style={{height: document.documentElement.clientHeight * 0.8, overflow: 'scroll'}}>
                                <Rule/>
                            </div>
                        </Modal>
                    </WingBlank>
                    {/*   */}

                    {/* top */}
                    <div className="Max_top">
                        <div className="Size ">{i18.t("MyPOFIDIN")}</div>
                        <div className="line"></div>
                        <div className="flex pd">
                            <div>
                                {account && account.Name} {escapeStr(account && account.MainPKr)}
                            </div>
                            <Button className="mr" size="small" type="ghost" onClick={() => this.cutUser('user')}>{i18.t("cut")}</Button>
                        </div>
                        <div className="just_size cen">PFIDKEY:&ensp;{this.getBalance("PFIDKEY")}</div>
                        <div className="line"></div>

                    </div>
                    {/* align-item:center */}
                    <div className="Max_center">
                        <div className="Size">{title}</div>
                        <div className="line"></div>
                        {detail}

                    </div>
                    {/* bottom */}

                    {
                        info && info.code?<div className="Max_bottom">
                            <div className="Size">{i18.t("ContractAccount")}</div>
                            <div className="line"></div>
                    <p className="just_size">{i18.t("ContractRemain")}:&ensp;{Math.ceil((parseInt(info.createTime) + baseTime * 90 - Date.now()/1000)/baseTime)}{i18.t("Day")}</p>
                            <p className="just_size">{i18.t("MyRank")}:&ensp;V{info && info?.level}</p>
                            <div className="line"></div>
                            <p className="just_size">{i18.t("Invitation")}:</p>
                            <div>
                                <List>
                                    <List.Item extra={<Badge text={info.directUserCount} />}><span className="lot">{i18.t("Generation")}</span></List.Item>
                                    <List.Item extra={<Badge text={info.indirectUserCount} />}><span className="lot">{i18.t("Secondary")}</span></List.Item>
                                </List>
                            </div>
                            <div className="line"></div>
                            <div className="just_size v1firend">{i18.t("MyV1Friend")}:{info && info?.v1Count}</div>
                            <div className="line"></div>
                            <div className="tal">
                                <p><span className="just_size">{i18.t("MyEarnings")}:</span>
                                    <br/><span
                                    className=" ">（&nbsp;{i18.t("EverydayUpdate")+newTime()}&nbsp;）</span></p>
                                <List>
                                    <List.Item extra={<span className="lot">{info && info?.interest ? fromValue(info?.interest, 18).toFixed(3, 1)+ " PFID" : "0.000" + " PFID"}</span>}>{i18.t("FixedShare")}</List.Item>
                                    <List.Item extra={<span className="lot">{info && info?.refer ? fromValue(info?.refer, 18).toFixed(3, 1)+ " PFID" : "0.000" + " PFID"}</span>}>{i18.t("PromotionShare")}</List.Item>
                                    <List.Item extra={<span className="lot">{info && info?.v1 ? fromValue(info?.v1, 18).toFixed(3, 1)+ " PFID" : "0.000" + " PFID"}</span>}>{i18.t("V1Share")}</List.Item>
                                    <List.Item extra={<span className="lot">{info && info?.v2 ? fromValue(info?.v2, 18).toFixed(3, 1)+ " PFID" : "0.000" + " PFID"}</span>}>{i18.t("V2Share")}</List.Item>
                                </List>
                            </div>
                            <div className="line"></div>
                            <div className="tac">
                                <p className="action just_size">{i18.t("CanWithDraw")}:{fromValue(info && info?.canWithDraw, 18).toFixed(3, 1)}PFID</p>
                                <div className="btn" onClick={() => {
                                    this.withdraw()
                                }}>{i18.t("WithDraw")}
                                </div>
                            </div>

                        </div>:""
                    }
                </div>
            </div>
        )
    }
}

function newTime() {
    let d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    let year = d.getUTCFullYear();
    let month = d.getUTCMonth();
    let day = d.getUTCDate();
    d = new Date(year, month, day, 0, 0, 0);

    let tz = new Date().getTimezoneOffset() / 60;
    let n = d.getTime() + (-tz+4) * 60 * 60 * 1000;
    return formatZero(new Date(n).getHours()) + ":"+formatZero(new Date(n).getMinutes());

}

export default Contract;