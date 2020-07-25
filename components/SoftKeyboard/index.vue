<template>
  <div
    :class="keyboardClass"
    :style="buttonPressed ? 'padding-top: 50px' : ''"
  ></div>
</template>

<script>
import 'simple-keyboard/build/css/index.css'
import KEY_MAP from './keyMap'
import display from './display'
import layout from './layout'

export default {
  name: 'SimpleKeyboard',
  props: {
    keyboardClass: {
      default: 'simple-keyboard',
      type: String,
    },
    input: {
      type: String,
    },
    theme: String,
  },
  data: () => ({
    buttonPressed: false,
    keyboard: null,
  }),
  methods: {
    onKeyReleased(button) {
      this.buttonPressed = false
      if (button === '{shift}') {
        return this.handleShift()
      }
      if (['{numbers}', '{spc}', '{default}', '{fn}'].includes(button)) {
        return this.keyboard.setOptions({
          layoutName: button.slice(1, button.length - 1),
        })
      }
      const code =
        button.length > 1
          ? KEY_MAP[button.slice(1, button.length - 1)]
          : button.charCodeAt(0)
      // Clear input if enter is pressed
      if (code === 65293) {
        this.keyboard.clearInput()
        this.$emit('input', '')
      }
      this.$emit('key', code)
    },
    onKeyPress(button) {
      this.buttonPressed = true
    },
    clearInput() {
      this.keyboard.clearInput()
      this.$emit('input', '')
    },

    handleShift() {
      let currentLayout = this.keyboard.options.layoutName
      let shiftToggle = currentLayout === 'default' ? 'shift' : 'default'
      this.keyboard.setOptions({
        layoutName: shiftToggle,
      })
    },
  },
  async mounted() {
    if (process.client) {
      this.keyboard = new (await import('simple-keyboard')).default({
        theme: this.theme,
        onKeyReleased: this.onKeyReleased,
        onKeyPress: this.onKeyPress,
        onChange: (input) => this.$emit('input', input),
        mergeDisplay: true,
        layoutName: 'default',
        layout,
        display,
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.simple-keyboard {
  max-width: 850px;
  --primary: rgba(255, 255, 255, 0.7);
  --secondary: #4caf50;
}

/*
  Theme: greenDark
*/
.simple-keyboard.greenDark {
  background-color: transparent;

  border-radius: 0px;
  padding: 0px;
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
.simple-keyboard.greenDark .hg-button[data-skbtn='{enter}'] {
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
