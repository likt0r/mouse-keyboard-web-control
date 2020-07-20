<template>
  <div
    class="touchPad"
    @touchstart="touchStart"
    @touchend="touchEnd"
    @touchmove="touchMove"
  ></div>
</template>
<script>
import axios from 'axios'
import tools from '~/tools/touch'

import requestThrottel from '~/tools/requestThrottel'

let oldPosX = 0
let oldPosY = 0
let startPosX = 0
let startPosY = 0
let isClickTimeout

export default {
  data() {
    return {
      pointerOnScreen: 0,
      trackPointerPosition: false,
      isClickTimeoutTime: 250,
      isClick: false,
      isClickCancelDistance: 10, // If pointer moves more than 60px await from start is not a click
      moveThrottel: null,
      speed: 2,
    }
  },
  methods: {
    touchStart(event) {
      console.log('Touch Start')
      this.trackPointerPosition = true
      startPosX = oldPosX = event.touches[0].clientX
      startPosY = oldPosY = event.touches[0].clientY
      this.pointerOnScreen = event.touches.length
      this.isClick = true
      isClickTimeout = setTimeout(
        () => (this.isClick = false),
        this.isClickTimeoutTime
      )

      // mouse down when second finger on screen
      if (this.pointerOnScreen === 2) {
        axios.post('/api/mouse/mouse-down', {
          button: 'left',
        })
      }
    },
    async touchMove(event) {
      if (this.pointerOnScreen <= 2) {
        // move mouse cursor only with one finger
        this.moveThrottel.send({
          x: event.touches[0].clientX - oldPosX,
          y: event.touches[0].clientY - oldPosY,
        })
      }
      oldPosX = event.touches[0].clientX
      oldPosY = event.touches[0].clientY
      event.preventDefault()
    },
    touchEnd(event) {
      this.pointerOnScreen = event.touches.length
      if (this.isClick) {
        clearTimeout(isClickTimeout)
        if (
          event.touches.length <= 3 &&
          tools.getDistance(startPosX, oldPosX, startPosY, oldPosY) <
            this.isClickCancelDistance
        ) {
          // 1 touch is left, 2 touch is right, 3 touches is middle
          axios.post('/api/mouse/click', {
            button: tools.getMouseButtonName(event.touches.length),
          })
        }
        this.isClick = false
      }
      // mouse up when second finger leaves screen
      if (this.pointerOnScreen === 1) {
        axios.post('/api/mouse/mouse-up', {
          button: 'left',
        })
      }
      this.trackPointerPosition = false
      console.log('Touch End')
    },
    trackPointer() {},
  },
  beforeMount() {
    this.moveThrottel = requestThrottel(
      '/api/mouse/move',
      function (pipeline) {
        return pipeline.reduce(
          (acc, data) => {
            acc.x += data.x
            acc.y += data.y
            return acc
          },
          {
            x: 0,
            y: 0,
          }
        )
      },
      (data) => {
        return {
          x: Math.round(data.x * this.speed),
          y: Math.round(data.y * this.speed),
        }
      }
    )
  },
}
</script>
