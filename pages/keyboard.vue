<template>
  <v-container class="fill-height" fluid>
    <v-textarea
      outlined
      name="input-7-4"
      ref="input"
      style="color: white;"
      @input="onKeyPress"
      v-model="input"
      autocapitalize="none"
      class="keyInput"
    ></v-textarea>
  </v-container>
</template>

<script>
import axios from 'axios'
import tool from '~/tools/key'

var getKeyCode = function (str) {
  return str.charCodeAt(str.length - 1)
}
export default {
  components: {},
  data: () => ({
    input: '',
    lastLength: 0,
  }),
  methods: {
    onKeyPress(e) {
      let kCd = e.keyCode || e.which
      console.log(e)
      // if (kCd == 0 || kCd == 229) {
      //   //for android chrome keycode fix
      //   kCd = getKeyCode(this.$refs.input.value)
      // }
      // // convert to hex
      // console.log('kcfd', kCd)
      // axios.post('/api/keyboard/key', {
      //   code: tool.toHexCode(kCd),
      // })
    },
    setInputFocus() {
      this.$nextTick(() => this.$refs.input.focus())
    },
  },
  mounted() {
    this.input = ''
    this.lastLength = 0
    this.setInputFocus()
  },
}
</script>
<style scoped></style>
