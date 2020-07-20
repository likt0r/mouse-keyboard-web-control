<template>
  <v-container class="fill-height pa-0 align-end" fluid>
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
      <SimpleKeyboard
        @onChange="onChange"
        @onKeyPress="onKeyPress"
        :input="input"
        :theme="theme"
      />
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
    theme: 'hg-theme-default myTheme1',
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
<style>
:root {
  --primary: rgba(255, 255, 255, 0.7);
  --secondary: #4caf50;
}

.simple-keyboard {
  max-width: 850px;
}

/*
  Theme: myTheme1
*/
.simple-keyboard.myTheme1 {
  background-color: transparent;

  border-radius: 0px;
  padding: 0px;
  padding-top: 50px;
}
.simple-keyboard.myTheme1 .hg-row {
  margin-bottom: 0px !important;
}

.simple-keyboard.myTheme1 .hg-button {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2e2e2e;
  border: 0px solid var(--secondary);
  border-radius: 0px;
  color: var(--primary);
  margin-right: 0px !important;
}

.simple-keyboard.myTheme1 .hg-button[data-skbtn='{space}'] {
  flex-grow: 10;
}
.simple-keyboard.myTheme1 .hg-button[data-skbtn='{ent}'] {
  flex-grow: 5;
}

.simple-keyboard.myTheme1 .hg-button:active {
  margin-top: -50px;
  align-items: flex-start;
  height: 100px;
  background: var(--secondary);
  color: white;
  font-size: 17px;
}

#root .simple-keyboard.myTheme1 + .simple-keyboard-preview {
  background: #1c4995;
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
