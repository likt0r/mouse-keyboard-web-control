<template>
  <div :class="keyboardClass"></div>
</template>

<script>
import 'simple-keyboard/build/css/index.css'
import tools from '~/tools/key'
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
        onKeyReleased: this.onKeyReleased,
        mergeDisplay: true,
        layoutName: 'default',
        layout: {
          default: [
            '1 2 3 4 5 6 7 8 9 0',
            'q w e r t y u i o p',
            '{tab} a s d f g h j k l',
            '{shift} z x c v b n m {backspace}',
            '{numbers} {spc} {fn} {space} {enter}',
          ],
          alt: [
            '1 2 3 4 5 6 7 8 9 0',
            'q w e r t y u i o p',
            '{tab} a s d f g h j k l',
            '{shift} z x c v b n m {backspace}',
            '{numbers} {spc} {fn} {space} {enter}',
          ],
          shift: [
            '! " § $ % & / ( ) =',
            'Q W E R T Y U I O P',
            '{tab} A S D F G H J K L',
            '{shift} Z X C V B N M {backspace}',
            '{numbers} {spc} {fn} {space} {enter}',
          ],

          spc: [
            '′ ` ´ ’ ^ ¸ ° ˝ _',
            '\\ ¨ ~ ^ | · … – -',
            "? Ü Ö Ä * ' > ; :",
            'ß ü ö ä + # < , .',
            '{numbers} {default} {fn} {space} {enter}',
          ],
          fn: [
            '{f7} {f8} {f9} {f10} {f11} {f12}',
            '{f1} {f2} {f3} {f4} {f5} {f6}',
            '{insert} {delete} {home} {end} {pageUp} {pageDown}',
            '{numbers} {spc} {default} {space} {enter}',
          ],
          numbers: [
            '/ * + -',
            '7 8 9 :',
            '4 5 6 .',
            '1 2 3 ,',
            '{default} 0 {delete} {backspace}',
          ],
        },
        display: {
          '{delete}': 'entf',
          '{insert}': 'enfg',
          '{home}': 'pos1',
          '{end}': 'ende',
          '{pageUp}': 'BILD↑',
          '{pageDown}': 'BILD↓',
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
          '{enter}': '↩',
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
          '{default}': 'abc',
          '{fn}': 'fn',
        },
      })
      return this.$emit('layoutChanged')
    }
  },
  methods: {
    onKeyReleased(button) {
      if (button === '{shift}') {
        this.handleShift()
        return this.$emit('layoutChanged')
      }
      if (['{numbers}', '{spc}', '{default}', '{fn}'].includes(button)) {
        this.keyboard.setOptions({
          layoutName: button.slice(1, button.length - 1),
        })
        return this.$emit('layoutChanged')
      }

      console.log(
        'Key map error' + button + ': ',
        tools.KEY_MAP[button.slice(1, button.length - 1)]
      )
      const keyCode =
        button.length > 1
          ? tools.KEY_MAP[button.slice(1, button.length - 1)]
          : button.charCodeAt(0)
      this.$emit('keyCode', keyCode)
    },

    handleShift() {
      let currentLayout = this.keyboard.options.layoutName
      let shiftToggle = currentLayout === 'default' ? 'shift' : 'default'
      this.keyboard.setOptions({
        layoutName: shiftToggle,
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
