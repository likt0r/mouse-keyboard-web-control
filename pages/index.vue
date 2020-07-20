<template>
  <v-container class="fill-height" row wrap align-center>
    <v-flex class="justify-center">
      <v-img src="mouse.png" contain max></v-img>
    </v-flex>
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
