import * as React from 'react';
import {Flex} from 'antd-mobile'

const Rule:React.FC<any> = ()=>{

    return (
        <div className="rule">
            <h3>一、如何参与波金合约产品</h3>
            <p>1、渠道在每一期波金之前有一次前期认购机会；</p>
            <p>2、通过预付USDT获取一批波金开启的钥匙（币名为PFID_KEY，例如一次购买200枚的钥匙）；</p>
            <p>3、参与预付200枚钥匙的公会，才有资格成为超级节点，参与公会团战赢高额奖励；</p>
            <p>4、每天下午14:00，通过波金合约，发送PFID_KEY争抢当日释放波金份额；</p>
            <p>5、通过提交PFID_KEY的时间，进行优先排序；</p>
            <p>6、由于每天波金产品数量有限，先提交钥匙的用户将获得波金产品包；</p>
            <p>7、其余非渠道用户可以通过购买PFID，并进入CORAL DEX换取PFID_KEY；</p>
            <p>8、一个账户只能同时参与一次波金份额；</p>

                <h3>二、购买规则</h3>
                <p>1、购买波金产品即可参与投资，产品价格600USDT，产品周期为90天；</p>
                <p>2、项目初期用户需要使用USDT购买激活产品；</p>
                <p>3、后续将开放PFID购买渠道，以PFID实时币价锚定等值的600USDT；</p>
                <p>4、每天中午12:00发放前一天获得的分红；</p>
                <p>5、每天下午14:00开启波金产品包抢购活动；</p>
                <h3>三、波金产品释放数量表</h3>
                <Flex>
                    <Flex.Item>周数</Flex.Item>
                    <Flex.Item>每天开放数量</Flex.Item>
                    <Flex.Item>每周开放数量</Flex.Item>
                    <Flex.Item>产品包有效期</Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>第1周</Flex.Item>
                    <Flex.Item>50</Flex.Item>
                    <Flex.Item>350</Flex.Item>
                    <Flex.Item></Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>第2周</Flex.Item>
                    <Flex.Item>50</Flex.Item>
                    <Flex.Item>350</Flex.Item>
                    <Flex.Item></Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>第3周</Flex.Item>
                    <Flex.Item>75</Flex.Item>
                    <Flex.Item>525</Flex.Item>
                    <Flex.Item></Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>第4周</Flex.Item>
                    <Flex.Item>75</Flex.Item>
                    <Flex.Item>525</Flex.Item>
                    <Flex.Item></Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>第5周</Flex.Item>
                    <Flex.Item>100</Flex.Item>
                    <Flex.Item>700</Flex.Item>
                    <Flex.Item>90天</Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>第6周</Flex.Item>
                    <Flex.Item>100</Flex.Item>
                    <Flex.Item>700</Flex.Item>
                    <Flex.Item></Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>第7周</Flex.Item>
                    <Flex.Item>125</Flex.Item>
                    <Flex.Item>875</Flex.Item>
                    <Flex.Item></Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>第8周</Flex.Item>
                    <Flex.Item>125</Flex.Item>
                    <Flex.Item>875</Flex.Item>
                    <Flex.Item></Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item></Flex.Item>
                    <Flex.Item>合计</Flex.Item>
                    <Flex.Item>4900</Flex.Item>
                    <Flex.Item></Flex.Item>
                </Flex>

                <p>每个波金产品包价格600U；</p>
                <p>每个账户只能购买一份产品包；</p>
                <p>第一期（前7天）购买产品包支持USDT入金，第二期开始通过等值600U的PFID购买；</p>

                <h3>四、静态收益</h3>
                <p>1、90天静态收益9%</p>
                <p>2、投资600U，90天到期应得654U。</p>
                <p>3、用户每天中午12点之后，获得7.266U对应的PFID。PFID价格以每天中午12点的收盘价为准进行换算，发放给用户。</p>

                <h3>五、动态收益</h3>
                <p>1、动态收益最高10%</p>
                <p>2、直推5% 600×0.05=30USDT（对应的PFID）</p>
                <p>3、间推5% 600×0.05=30USDT（对应的PFID）</p>
                <p>4、每天推荐成功购买产品的奖励，将根据第二天中午12点PFID价格进行换算发放。</p>

                <p>POFID项目没有早期投资机构参与，市场流通量仅仅1.5%，有非常大的上涨空间，所以每一颗PFID都价值很高，同时有非常大的上升空间。</p>

                <h3>六、V池收益</h3>
                <p>1、V池分为两种V1和V2，每天总入金的2%进入V1奖池，总入金的2%进入V2奖池；</p>
                <p>2、领导人直推10个用户，两层内达到20个用户时，此领导人自动进入V1奖池参与奖池瓜分；</p>
                <p>3、领导人伞下有3个用户达到V1时，自动进入V2奖池，参与奖金瓜分，并且V1和V2的奖池同时参与；</p>
                <p>（V池没有领导人进入前，每天V池中的奖金清零）</p>
                <p>4、V池里的奖金是根据推广用户的占比进行分成；</p>
                <p>5、多劳多得，对每个人都公平合理；</p>
                <img src={"./images/picture.png"} style={{width:'100%'}}/>
                <h3>七、市场费用支援</h3>
                <p>1、超级节点每周完成指定任务；</p>
                <p>2、获得当周此超级节点入金额的1%对应的PFID；</p>
                <p>3、作为市场推广费用，支援给超级节点领导人，为了激励市场推广；</p>
                <p>4、从第一期产品上线的第一天的零点开始计时，到7天后的零点为一个考核周期，完成以下推广任务，则在第8天的中午12点，根据此超级节点入金额的1%对应的PFID，发放到超级节点钱包账户。</p>
                <Flex>
                    <Flex.Item>期数</Flex.Item>
                    <Flex.Item>需要完成数量</Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>1期</Flex.Item>
                    <Flex.Item>40</Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>2期</Flex.Item>
                    <Flex.Item>40</Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>3期</Flex.Item>
                    <Flex.Item>60</Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>4期</Flex.Item>
                    <Flex.Item>60</Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>5期</Flex.Item>
                    <Flex.Item>80</Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>6期</Flex.Item>
                    <Flex.Item>80</Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>7期</Flex.Item>
                    <Flex.Item>100</Flex.Item>
                </Flex>
                <Flex>
                    <Flex.Item>8期</Flex.Item>
                    <Flex.Item>100</Flex.Item>
                </Flex>
        </div>
    )
}

export default Rule