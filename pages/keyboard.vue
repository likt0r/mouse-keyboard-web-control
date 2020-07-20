<template>
  <v-container class="fill-height" fluid>
    <!-- <v-textarea
      outlined
      name="input-7-4"
      ref="input"
      style="color: white;"
      @input="onKeyPress"
      v-model="input"
      autocapitalize="none"
      class="keyInput"
    ></v-textarea>-->
    <client-only placeholder="Loading...">
      <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="input" :theme="theme" />
    </client-only>
  </v-container>
</template>

<script>
import axios from 'axios'
import tool from '~/tools/key'
import SimpleKeyboard from '~/components/SimpleKeyboard'

var getKeyCode = function (str) {
  return str.charCodeAt(str.length - 1)
}
export default {
  components: {
    SimpleKeyboard,
  },
  data: () => ({
    input: '',
    lastLength: 0,
     theme: "hg-theme-default myTheme1"
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

    onChange(input) {
      // this.input = input;
    },
    onKeyPress(button) {
      console.log('button', button)
    },
    onInputChange(input) {
      // this.input = input.target.value;
    },
  },
  mounted() {
    this.input = ''
    this.lastLength = 0
  },
}
</script>
<style >
.simple-keyboard {
	max-width: 850px;
}

/*
  Theme: myTheme1
*/
.simple-keyboard.myTheme1 {
	background-color: rgba(0, 0, 0, 0.8);
	border-radius: 0;
	border-bottom-right-radius: 5px;
	border-bottom-left-radius: 5px;
}

.simple-keyboard.myTheme1 .hg-button {
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0, 0, 0, 0.5);
	color: white;
}

.simple-keyboard.myTheme1 .hg-button:active {
	background: #1c4995;
	color: white;
}

#root .simple-keyboard.myTheme1 + .simple-keyboard-preview {
	background: #1c4995;
}
.bg {
	background-image: url('/carbon.jpg');
	background-repeat: repeat;
}

.touchPad {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 56px;
	width: 100%;
	color: thistle;
	opacity: 0.3;
	/* background-color: red; */
}
</style>
