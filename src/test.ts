const path = require('path')
const fs = require('fs')
const fontsub = require('./index')
const fontpath = path.resolve(
  __dirname,
  '..',
  'fonts',
  'SourceHanSansCN-Regular.ttf'
)
const source = '12310的一了'
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
        '12340呼吸科的朱倩倩一门心思的赚钱，开源节流节省的不是一般。在其他科室，只要转科医生用心，带教老师多多少少的会给点辛苦费，管饭、买水都是常规。刚入职的转科医生，就靠着一点死工资苦吧苦的死熬，也不是没钱吃饭，带教医生管饭、买水也是一种对转科医生的肯定和认可。',
        res.map
      )
    )
  })
