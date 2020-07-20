export default {
  toHexCode(number) {
    let template = '0x0000'
    let hex = number.toString(16)
    return template.slice(0, 6 - Math.min(hex.length, 4)).concat(hex)
  },
}
