<template>
  <v-container
    :class="`keyboard-control keyboard-control--${
      uiLandscape ? 'landscape' : 'portrait'
    } fill-height pa-0 align-center justify-end flex-column`"
    overflow-hidden
    fluid
    ref="cont"
  >
    <SimpleKeyboard ref="keyboard" @key="onKey" :theme="theme" />
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import SimpleKeyboard from '~/components/SoftKeyboard'

export default {
  components: {
    SimpleKeyboard,
  },
  data: () => ({
    theme: 'hg-theme-default greenDark',
  }),
  computed: {
    ...mapState({
      uiLandscape: (state) => state.device.uiLandscape,
    }),
  },
  methods: {
    onKey(code) {
      console.log('onKey ', code)
      this.$axios.post('/api/keyboard/key', {
        code,
      })
    },
  },
  mounted() {},
}
</script>

<style scoped>
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
  bottom: 0px;
}
</style>
