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
      return `d-flex align-stretch tool-bar tool-bar--${
        this.uiLandscape
          ? 'landscape flex-column-reverse align-items-stretch'
          : 'portait'
      } ${this.justifyContent ? `justify-${this.justifyContent}` : ''}`
    },
  },
  methods: {},
}
</script>
<style scoped>
.tool-bar >>> .v-btn {
  color: rgba(255, 255, 255, 0.7);
}
.tool-bar >>> .v-btn:active,
.v-btn:hover {
  color: rgba(255, 255, 255, 1) !important;
}

.tool-bar--portait {
  position: fixed;
  bottom: 57px;
  width: 100%;
  z-index: 2;
}
.tool-bar--landscape {
  position: fixed;
  right: 57px;
  height: 100%;
  z-index: 2;
}
</style>
