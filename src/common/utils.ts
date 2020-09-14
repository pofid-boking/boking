import BigNumber from 'bignumber.js'

export function escapeStr(pkr:string){
    if(pkr){
        return pkr.slice(0,5) + "..." + pkr.slice(pkr.length-5)
    }
    return ""
}

export function toValue(v:BigNumber |string | number | undefined,decimal:number):BigNumber{
    if(v){
        return new BigNumber(v).multipliedBy(10**decimal) 
    }
    return new BigNumber(0)
}

export function fromValue(v:BigNumber |string | number | undefined,decimal:number):BigNumber{
    if(v){
        return new BigNumber(v).dividedBy(10**decimal) 
    }
    return new BigNumber(0)
}

export function formatDate(v:number) {
    const date = new Date(v);
    return [(date.getMonth()+1) , "/" , date.getDate() , " " ,date.getHours(),":",date.getMinutes()].join("")
}