<template>
  <div :class="keyboardClass"></div>
</template>

<script>
import 'simple-keyboard/build/css/index.css'
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
    keyboard: null,
  }),
  async mounted() {
    if (process.client) {
      this.keyboard = new (await import('simple-keyboard')).default({
        theme: this.theme,
        onChange: this.onChange,
        onKeyPress: this.onKeyPress,
        mergeDisplay: true,
        layoutName: 'default',
        layout: {
          default: [
            '1 2 3 4 5 6 7 8 9 0',
            'q w e r t y u i o p',
            '{tab} a s d f g h j k l',
            '{shift} z x c v b n m {backspace}',
            '{numbers} {spc} {space} {ent}',
          ],
          shift: [
            '! " § $ % & / ( ) =',
            'Q W E R T Y U I O P',
            '{tab} A S D F G H J K L',
            '{shift} Z X C V B N M {backspace}',
            '{numbers} {spc} {space} {ent}',
          ],
          spc: [
            '′ ` ´ ’ ^ ¸ ° ˝ _',
            '\\ ¨ ~ ^ | · … – -',
            "? Ü Ö Ä * ' > ; :",
            'ß ü ö ä + # < , .',
            '{numbers} {abc} {space} {ent}',
          ],
          fn: [
            '{f7} {f8} {f9} {f10} {f11} {f12}',
            '{f1} {f2} {f3} {f4} {f5} {f6}',
            '{enfg} {entf} {pos1} {ende} {bUp} {bDown}',
          ],
          numbers: [
            '/ * + -',
            '7 8 9 :',
            '4 5 6 .',
            '1 2 3 ,',
            '{abc} 0 {entf} {backspace}',
          ],
        },
        display: {
          '{entf}': 'entf',
          '{entf}': 'enfg',
          '{pos1}': 'pos1',
          '{ende}': 'ende',
          '{bUp}': 'BILD↑',
          '{bDown}': 'BILD↓',
          '{f1}': 'f1',
          '{f2}': 'f2',
          '{f3}': 'f3',
          '{f4}': 'f4',
          '{f5}': 'f5',
          '{f6}': 'f6',
          '{f7}': 'f7',
          '{f8}': 'f8',
          '{f9}': 'f9',
          '{f10}': 'f10',
          '{f11}': 'f11',
          '{f12}': 'f12',
          '{spc}': 'ä?.',
          '{numbers}': '123',
          '{ent}': '↩',
          '{escape}': 'esc ⎋',
          '{tab}': '⇥',
          '{backspace}': '⌫',
          '{capslock}': 'caps lock ⇪',
          '{shift}': '⇧',
          '{controlleft}': 'ctrl ⌃',
          '{controlright}': 'ctrl ⌃',
          '{altleft}': 'alt ⌥',
          '{altright}': 'alt ⌥',
          '{metaleft}': 'cmd ⌘',
          '{metaright}': 'cmd ⌘',
          '{abc}': 'abc',
        },
      })
    }
  },
  methods: {
    onChange(input) {
      this.$emit('onChange', input)
    },
    onKeyPress(button) {
      this.$emit('onKeyPress', button)
      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === '{shift}' || button === '{lock}') this.handleShift()
      if (button === '{numbers}') this.handleNumbers()
      if (button === '{spc}') this.handleSpecialChars()
      if (button === '{abc}')
        this.keyboard.setOptions({
          layoutName: 'default',
        })
    },

    handleShift() {
      let currentLayout = this.keyboard.options.layoutName
      let shiftToggle = currentLayout === 'default' ? 'shift' : 'default'
      this.keyboard.setOptions({
        layoutName: shiftToggle,
      })
    },
    handleNumbers() {
      let currentLayout = this.keyboard.options.layoutName
      let numbersToggle = currentLayout !== 'numbers' ? 'numbers' : 'default'

      this.keyboard.setOptions({
        layoutName: numbersToggle,
      })
    },
    handleSpecialChars() {
      let currentLayout = this.keyboard.options.layoutName
      let toggle = currentLayout !== 'spc' ? 'spc' : 'default'

      this.keyboard.setOptions({
        layoutName: toggle,
      })
    },
  },
  watch: {
    input(input) {
      // this.keyboard.setInput(input)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
