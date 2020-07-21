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
import { mapState, mapActions } from 'vuex'

let oldPosX = 0
let oldPosY = 0
let startPosX = 0
let startPosY = 0
let isClickTimeout
let scrollWheelAccumulator = 0
export default {
  data() {
    return {
      pointerOnScreen: 0,
      trackPointerPosition: false,
      isClickTimeoutTime: 250,
      isClick: false,
      isClickCancelDistance: 10, // If pointer moves more than 60px await from start is not a click
      moveThrottel: null,
      wheelThreshold: 25,
    }
  },
  computed: {
    ...mapState({
      touchAccel: (state) => state.settings.touchAccel,
      touchSpeed: (state) => state.settings.touchSpeed,
    }),
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
        this.$axios.post('/api/mouse/mouse-down', {
          button: 'left',
        })
      }
      if (this.pointerOnScreen === 3) {
        this.$axios.post('/api/mouse/mouse-up', {
          button: 'left',
        })
      }
      event.preventDefault()
    },
    async touchMove(event) {
      if (this.pointerOnScreen <= 2) {
        // move mouse cursor only with one finger
        let delta = {
          x: event.touches[0].clientX - oldPosX,
          y: event.touches[0].clientY - oldPosY,
        }
        console.log('before trans', delta)
        delta = tools.cartesian2polar(delta)
        console.log('polar', delta)
        delta.r = Math.pow(delta.r, this.touchAccel) * this.touchSpeed
        console.log('after trans', delta)
        delta = tools.polar2cartesian(delta)
        console.log('in cart', delta)
        this.moveThrottel.send(delta)
      }
      // Three fingers Mouse wheel simualtion
      if (this.pointerOnScreen === 3) {
        scrollWheelAccumulator += event.touches[0].clientY - oldPosY
        if (Math.abs(scrollWheelAccumulator) > this.wheelThreshold) {
          if (Math.sign(scrollWheelAccumulator) > 0) {
            scrollWheelAccumulator -= this.wheelThreshold
            this.$axios.post('/api/mouse/wheel', {
              direction: 'up',
            })
          } else {
            scrollWheelAccumulator += this.wheelThreshold
            this.$axios.post('/api/mouse/wheel', {
              direction: 'down',
            })
          }
        }
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
          this.$axios.post('/api/mouse/click', {
            button: tools.getMouseButtonName(event.touches.length),
          })
        }
        this.isClick = false
      }
      // mouse up when second finger leaves screen
      if (this.pointerOnScreen === 1) {
        this.$axios.post('/api/mouse/mouse-up', {
          button: 'left',
        })
      }
      // third finger leaves screen reset scroll wheel accumulator
      if (this.pointerOnScreen === 2) {
        this.scrollWheelAccumulator = 0
        if (this.pointerOnScreen === 3) {
          this.$axios.post('/api/mouse/mouse-down', {
            button: 'left',
          })
        }
      }
      this.trackPointerPosition = false
      console.log('Touch End')
      event.preventDefault()
    },
    trackPointer() {},
  },
  beforeMount() {
    this.moveThrottel = requestThrottel(
      this.$axios,
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
          x: Math.round(data.x),
          y: Math.round(data.y),
        }
      }
    )
  },
}
</script>
