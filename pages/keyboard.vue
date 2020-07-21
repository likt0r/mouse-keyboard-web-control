<template>
  <v-container
    class="fill-height pa-0 align-center justify-end flex-column"
    fluid
    ref="cont"
  >
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

    <TouchPad
      v-if="!uiLandscape"
      class="touchPad align-self-auto align-content-stretch"
      :style="`width: 100%; height:${touchPadHeight}px;`"
    />
    <client-only>
      <SimpleKeyboard
        ref="keyboard"
        @layoutChanged="setTouchPadHeight()"
        @keyCode="onKeyPressed"
        :theme="theme"
      />
    </client-only>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
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
    theme: 'hg-theme-default greenDark',
    touchPadHeight: 0,
  }),
  computed: {
    ...mapState({ uiLandscape: (state) => state.device.uiLandscape }),
  },
  methods: {
    onKeyPressed(keyCode) {
      try {
        this.$axios.post('/api/keyboard/key2', {
          code: tool.toHexCode(keyCode),
        })
      } catch (error) {}
    },
    setTouchPadHeight() {
      if (!this.uiLandscape) {
        this.touchPadHeight =
          this.$refs.keyboard.$el.parentNode.offsetHeight -
          this.$refs.keyboard.$el.clientHeight
      }
    },
  },
  watch: {
    uiLandscape(uiLandscape) {
      if (uiLandscape) this.touchPadHeight = 0
      else {
        this.$nextTick(() => this.setTouchPadHeight())
      }
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
  Theme: greenDark
*/
.simple-keyboard.greenDark {
  background-color: transparent;

  border-radius: 0px;
  padding: 0px;
  padding-top: 50px;
}
.simple-keyboard.greenDark .hg-row {
  margin-bottom: 0px !important;
}

.simple-keyboard.greenDark .hg-button {
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

.simple-keyboard.greenDark .hg-button[data-skbtn='{space}'] {
  flex-grow: 10;
}
.simple-keyboard.greenDark .hg-button[data-skbtn='{ent}'] {
  flex-grow: 5;
}

.simple-keyboard.greenDark .hg-button:active {
  margin-top: -50px;
  align-items: flex-start;
  height: 100px;
  background: var(--secondary);
  color: white;
  font-size: 17px;
}

#root .simple-keyboard.greenDark + .simple-keyboard-preview {
  background: #1c4995;
}
</style>
