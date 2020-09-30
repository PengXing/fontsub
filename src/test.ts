const path = require('path')
const fs = require('fs')
const fontsub = require('./index')
const fontpath = path.resolve(
  __dirname,
  '..',
  'fonts',
  'SourceHanSansCN-Regular.ttf'
)
const source =
  '的一了是我不在人们有来他这上着个地到大里说去子得也和那要下看天时过出小么起你都把好还多没为又可家学只以主会样年想能生同老中从自面前头到它后然走很像见两用她国动进成回什边作对开而已些现山民候经发工向事命给长水几义三声于高正妈手知理眼志点心战二问但身方实吃做叫当住听革打呢真党全才四已所敌之最光产情路分总条白话东席次亲如被花口放儿常西气五第使写军吧文运在果怎定许快明行因别飞外树物活部门无往船望新带队先力完间却站代员机更九您每风级跟笑啊孩万少直意夜比阶连车重便斗马哪化太指变社似士者干石满决百原拿群究各六本思解立河爸村八难早论吗根共让相研今其书坐接应关信觉死步反处记将千找争领或师结块跑谁草越字加脚紧爱等习阵怕月青半火法题建赶位唱海七女任件感准张团屋爷离色脸片科倒睛利世病刚且由送切星晚表够整认响雪流未场该并底深刻平伟忙提确近亮轻讲农古黑告界拉名呀土清阳照办史改历转画造嘴此治北必服雨穿父内识验传业菜爬睡兴'
fontsub
  .genSubsetFont({
    source,
    fontpath,
    codePointStart: 58000,
    outputTypes: ['ttf', 'woff2', 'eot', 'svg', 'woff'],
  })
  .then((res) => {
    fs.writeFileSync('test/subset.ttf', res.output.ttf)
    fs.writeFileSync('test/subset.woff2', res.output.woff2)
    fs.writeFileSync('test/subset.eot', res.output.eot)
    fs.writeFileSync('test/subset.svg', res.output.svg)
    fs.writeFileSync('test/subset.woff', res.output.woff)
    console.log(
      fontsub.convert(
        '呼吸科的朱倩倩一门心思的赚钱，开源节流节省的不是一般。在其他科室，只要转科医生用心，带教老师多多少少的会给点辛苦费，管饭、买水都是常规。刚入职的转科医生，就靠着一点死工资苦吧苦的死熬，也不是没钱吃饭，带教医生管饭、买水也是一种对转科医生的肯定和认可。',
        res.map
      )
    )
  })
