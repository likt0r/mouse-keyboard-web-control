<template>
  <v-container
    :class="`keyboard-control keyboard-control--${
      uiLandscape ? 'landscape' : 'portrait'
    } fill-height pa-0 align-center justify-end flex-column`"
    overflow-hidden
    fluid
    ref="cont"
  >
    <v-text-field
      v-if="showInput"
      elevation="6"
      :class="`text-display text-display--${
        uiLandscape ? 'landscape' : 'portrait'
      } ma-3`"
      v-model="textInput"
      solo
    ></v-text-field>

    <SimpleKeyboard
      ref="keyboard"
      @key="onKey"
      @input="onInput"
      :theme="theme"
    />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import SimpleKeyboard from '~/components/SoftKeyboard'
let hideInputTimeout

export default {
  components: {
    SimpleKeyboard,
  },
  data: () => ({
    textInput: '',
    showInput: false,
    theme: 'hg-theme-default greenDark',
  }),
  computed: {
    ...mapState({
      uiLandscape: (state) => state.device.uiLandscape,
      keyboardDisplayTimout: (state) => state.settings.keyboardDisplayTimout,
    }),
  },
  methods: {
    onInput(input) {
      this.textInput = input
    },
    onKey(code) {
      this.showInput = true
      if (!hideInputTimeout) {
        clearTimeout(hideInputTimeout)
        hideInputTimeout = setTimeout(() => {
          this.showInput = false
          hideInputTimeout = false
          this.$refs.keyboard.clearInput()
        }, this.keyboardDisplayTimout)
      }

      this.$axios.post('/api/keyboard/key', {
        code,
      })
    },
  },
  mounted() {},
}
</script>

<style scoped>
.text-display {
  position: fixed;
  top: 0;
}
.text-display--portrait {
  width: calc(100% - 32px);
  top: 56px;
}
.text-display--landscape {
  width: calc(100% - 132px);
  left: 56px;
}

.keyboard-control {
  z-index: 1;
  height: auto;
}
.keyboard-control--landscape {
  position: fixed;
  width: calc(100% - 56px);
  left: 0px;
  bottom: 0px;
}
.keyboard-control--portrait {
  position: fixed;
  width: 100% - 56px;
  left: 0px;
  bottom: 56px;
}
</style>
