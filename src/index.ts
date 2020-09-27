import fs = require('fs')
import path = require('path')
const Font = require('fonteditor-core').Font
const woff2 = require('fonteditor-core').woff2

type OutputType = 'ttf' | 'woff' | 'woff2' | 'eot' | 'svg'
interface Options {
  source: string
  fontpath: string
  codePointStart?: number
  outputTypes?: OutputType | Array<OutputType>
}
interface Res {
  map: {
    [key: string]: number
  }
  output: {
    [key: string]: Buffer
  }
}

/**
 * 根据原字体和原文字集和 codePointStart 重新生成一个字体文件，并输出他们之间的关系
 *
 * @param {Options} opts Options
 * @param {string} opts.source 需要转换的文字集
 * @param {string} opts.fontpath 字体文件
 * @param {number?} opts.codePointStart 字体子集的起始位置
 * @param {string|OutputType[]} opts.outputTypes 输出的字体文件的格式
 * @returns {Res}
 */
export async function genSubsetFont(opts: Options): Promise<Res> {
  const { source, fontpath, codePointStart = 58000 } = opts
  let outputTypes: OutputType[]
  if (!opts.outputTypes) {
    outputTypes = ['ttf']
  }
  if (typeof opts.outputTypes === 'string') {
    outputTypes = [opts.outputTypes]
  } else {
    outputTypes = opts.outputTypes
  }

  const codeMap = {}
  for (let i = 0; i < source.length; i++) {
    const s = source[i]
    if (codeMap[s]) {
      continue
    }
    codeMap[s] = source.charCodeAt(i)
  }

  const unicodeSet = Object.values(codeMap)
  const sourceBuffer = await fs.promises.readFile(fontpath)
  const font = Font.create(sourceBuffer, {
    type: path.extname(fontpath).replace('.', ''),
    subset: unicodeSet,
  })
  const fonts = font.find({
    unicode: unicodeSet,
  })
  const map = {}
  for (let i = 0; i < fonts.length; i++) {
    const glyf = fonts[i]
    const sourceUnicode = glyf.unicode[0]
    const unicode = codePointStart + i
    glyf.unicode = [unicode]
    map[String.fromCharCode(sourceUnicode)] = unicode
  }
  console.log(outputTypes)

  const output = {}
  for (let type of outputTypes) {
    if (type === 'woff2') {
      await woff2.init()
    }
    output[type] = font.write({ type })
  }

  return { map, output }
}

/**
 * 根据映射表把字符串转为『加密』后的字符串
 *
 * @param {string} source 需要被转换的字符串
 * @param {Object<string, number>} map 字符和 unicode 的映射表
 * @param {?string} type 导出的类型，目前只只是导出 HTML 的格式，如 &#10305;
 * @returns {string}
 */
export function convert(source, map, type = 'html') {
  let s = ''
  for (let i = 0; i < source.length; i++) {
    const c = source[i]
    if (map[c]) {
      s += '&#' + map[c] + ';'
    } else {
      s += c
    }
  }

  return s
}
