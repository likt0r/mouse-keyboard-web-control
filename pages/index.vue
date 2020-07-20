<template>
  <v-container
    class="fill-height pa-0 ma-0 align-center justify-center"
    row
    wrap
    align-center
  >
    <v-img
      src="mouse.png"
      contain
      max-width="50vh"
      style="opacity: 0.15;}"
    ></v-img>

    <TouchPad
      class="touchPad bg"
      :style="`left: ${uiLandscape ? '56px' : '0px'}; bottom: ${
        uiLandscape ? '0px' : '56px'
      }`"
    />
  </v-container>
</template>

<script>
import TouchPad from '~/components/TouchPad.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    TouchPad,
  },
  computed: {
    ...mapState({ uiLandscape: (state) => state.device.uiLandscape }),
  },
}
</script>
<style scoped></style>
