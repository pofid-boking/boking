import * as config from './config'
import BigNumber from 'bignumber.js'
import axios from 'axios'
import i18 from '../i18'

const serojs = require('serojs');
const seropp = require('sero-pp');

export interface UserInfo {
    own: string;
    code:any;
    referCode:any;
    lastWithDrawTime: any;
    createTime: any;
    directUserCount:any;
    indirectUserCount:any;
    // subUserInfos: any;
    interest: any;
    refer: any;
    v1: any;
    v2: any;
    
    level:any;
    v1Count:any;
    canWithDraw:any;
}

export interface Phase {
    seq: any;
    startTime: number;
    quantity: any;
    totalSelled: any;
    selledOfDay: Array<any>;
}

export interface Weeks {
    startTime:any;
    period: Array<Phase>;
}


export interface Params {
    from?: string
    to: string
    cy?: string
    value?: string
    gas?: string
    gasPrice?: string
    data?: string
}

class Service {

    contract: any;
    id:number;

    constructor() {
        this.id = 0 ;
        this.contract = serojs.callContract(config.abi, config.address);
    }


    async buy(referCode:string,account:any,value:BigNumber){
        return await this.execute("buy",[referCode],account,"PFIDKEY","0x"+value.toString(16));
    }

    async info(from:string):Promise<any>{
        const data:any = await this.call("info",[],from);
        console.log("info>>>>>>>",data);
        return data
    }
    async weekInfos():Promise<any>{
        const weeks:any = await this.call('weekInfos',[])
        console.log('weekInfos>>>>>>>>',weeks)
        return weeks;
    }
    async vPoolInfon(from:string):Promise<any>{
        const pools:any = await this.call('vPoolInfon',[],from);
        console.log('vPoolInfon>>>>>>>>>',pools);
        return ""
    }
    async withDraw(account:any):Promise<any>{
        return await this.execute("withDraw",[],account,"SERO","0x0");
    }
    convertResult(result: any) {
        const resultArray: any = [];
        result.forEach(function (res: any, i: any) {
            if (isFinite(i))
                resultArray.push(res);
        });
        const convert = function (resultArray: any) {
            return resultArray.map(function (res: any) {
                if (res.constructor.name === 'BN') {
                    res = res.toString(10);
                } else if (res instanceof Array) {
                    res = convert(res);
                }
                return res;
            });
        };
        return convert(resultArray);
    }
    
    async call(method: string, args: Array<any>, from?: string): Promise<any> {
        const packData: any = this.contract.packData(method, args, true)
        const contract = this.contract;                 
        return new Promise((resolve, reject) => {
            const params: Params = {
                to: this.contract.address   
            }
            if(from){
                params.from = from  
            }

            params.data = packData;     

            this.rpc("sero_call", [params, "latest"]).then(data => {
                if (data !== "0x") {
                    const rest: any = contract.unPackDataEx(method, data)
                    resolve(rest)
                } else {
                    // alert(alertmethod+"---"+data);
                }
            }).catch(err => {
                reject(err)
            })

        })
    }

    async accountList(): Promise<any> {
        return new Promise((resolve, rejects) => {
            seropp.getAccountList(function (accounts: any, error: any) {
                if (error) {
                    rejects(error);
                } else {
                    resolve(accounts)
                }
            })
        })
    }

    async execute(method: string, args: Array<any>, account: any, cy?: string, value?: string): Promise<any> {
        const packData: any = this.contract.packData(method, args, true)

        return new Promise((resolve, reject) => {
            const params: Params = {
                to: this.contract.address
            }
            params.from = account.MainPKr
            params.data = packData;
            if (cy) {
                params.cy = cy;
            }
            if (value) {
                params.value = value;
            }
            this.rpc("sero_estimateGas", [params]).then((data: any) => {
                params.gas = data;
                params.from = account.PK
                seropp.executeContract(params, function (hash: any, err: any) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(hash)
                    }
                })
            }).catch(e => {
                reject(e)
            })
        })
    }

    async rpc(method: string, args: any) {
        let host = localStorage.getItem("host");
        if (!host) {
            await this.initDApp();
            host = localStorage.getItem("host");
        }
        const data: any = {
            id: this.id++,
            method: method,
            params: args
        }
        return new Promise((resolve, reject) => {
            if (!host) {
                reject(new Error("rpc unset !"))
            } else {
                axios.post(host, data).then((resp: any) => {
                    if (resp.data && resp.data.error) {
                        reject(resp.data.error.message)
                    } else if (resp.data && resp.data.result) {
                        resolve(resp.data.result)
                    }
                }).catch(e => {
                    reject(e)
                })
            }
        })
    }

    async initDApp(){
        const dapp = {
            name: i18.t("contract"),
            contractAddress: config.address,
            github: "https://github.com/",
            author: "pofidin",
            url: window.location.origin+window.location.pathname,
            logo: window.location.origin+window.location.pathname +"/logo.png",

            barColor:"#1f1f1f",
            navColor:"#1f1f1f",
            barMode:"light",
            navMode:"light"
        }

        seropp.init(dapp,function (rest:any,err:any) {

            return new Promise((resolve,reject)=>{
                if(err){
                    reject(err)
                }else{
                    seropp.getInfo(function (data:any) {
                        if(data){
                            localStorage.setItem("language",data.language);
                            localStorage.setItem("host",data.rpc)
                            i18.changeLanguage(data.language).then(() => {});
                        }
                        resolve()
                    })
                }
            })
        });

    }
}

const service = new Service();
export default service;