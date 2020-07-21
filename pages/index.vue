<template>
  <v-container
    class="fill-height pa-0 ma-0 align-center justify-center"
    row
    wrap
    align-center
  >
    <TouchPad class="touchPad bg" :style="`width: 100%; height: 100%;`" />
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
