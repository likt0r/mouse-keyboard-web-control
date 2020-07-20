<template>
  <v-container class="fill-height">
    <TouchPad
      class="touchPad bg"
      :style="`left: ${uiLandscape ? '56px' : '0px'}; bottom: ${
        uiLandscape ? '0px' : '56px'
      }`"
    />
  </v-container>
</template>

<script>
import Logo from '~/components/Logo.vue'
import TouchPad from '~/components/TouchPad.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Logo,
    TouchPad,
  },
  computed: {
    ...mapState({ uiLandscape: (state) => state.device.uiLandscape }),
  },
}
</script>
<style scoped>
.bg {
  background-image: url('~@/assets/carbon.jpg');
  background-repeat: repeat;
}

.touchPad {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 56px;
  width: 100%;
  color: thistle;
  opacity: 0.3;
  /* background-color: red; */
}
</style>
