export default {
  getMouseButtonName(pointerCount) {
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
    return result
  },
  polar2cartesian({ r, theta }) {
    return {
      x: r * Math.cos(theta),
      y: r * Math.sin(theta),
    }
  },
  cartesian2polar({ x, y }) {
    return {
      r: Math.sqrt(x * x + y * y),
      theta: Math.atan2(y, x),
    }
  },
}
