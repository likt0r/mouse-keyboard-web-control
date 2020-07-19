export default {
  getMouseButtonName(pointerCount) {
    console.log('getMouseButtonName', pointerCount)
    switch (pointerCount) {
      case 0:
        return 'left'
      case 1:
        return 'right'
      case 2:
        return 'middle'
      default:
        return 'unkown'
    }
  },
  getDistance(xOld, xNew, yOld, yNew) {
    const result = Math.round(
      Math.sqrt(Math.pow(xOld - xNew, 2) + Math.pow(yOld - yNew, 2))
    )
    console.log('distance', result)
    return result
  },
}
