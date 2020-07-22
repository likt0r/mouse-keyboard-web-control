<template>
  <v-sheet
    :class="sheetClasses"
    :width="uiLandscape ? '56' : '100%'"
    :height="uiLandscape ? '100%' : '56'"
    color="grey darken-3"
  >
    <slot />
  </v-sheet>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: ['justify-content'],
  data: function () {
    return {}
  },
  computed: {
    ...mapState({
      uiLandscape: (state) => state.device.uiLandscape,
    }),
    sheetClasses() {
      return `d-flex align-stretch ${
        this.uiLandscape
          ? 'landscape-tool-bar flex-column-reverse align-items-stretch'
          : 'portait-tool-bar'
      } ${this.justifyContent ? `justify-${this.justifyContent}` : ''}`
    },
  },
  methods: {},
}
</script>
<style scoped>
.portait-tool-bar {
  position: fixed;
  bottom: 57px;
  width: 100%;
  z-index: 2;
}
.landscape-tool-bar {
  position: fixed;
  right: 57px;
  height: 100%;
  z-index: 2;
}
</style>
