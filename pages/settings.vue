<template>
  <v-container class="fill-height" fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card dark>
          <v-card-subtitle class="overline mb-4">Touchpad</v-card-subtitle>

          <v-card-text class="text--primary">
            Acceleration
            <v-slider
              v-model="accel"
              :value="speed"
              :min="100"
              :max="300"
              hide-details
              class="align-center"
          /></v-card-text>
          <v-card-text class="text--primary">
            Speed
            <v-slider
              v-model="speed"
              :value="speed"
              :min="5"
              :max="80"
              hide-details
              class="align-center"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- <v-row align="center" justify="center">
      <v-card>
        <v-subheader :inset="inset">Subheader</v-subheader>
        <v-slider
          v-model="acceleration"
          :min="100"
          :max="200"
          ticks:false
          hide-details
          class="align-center"
        ></v-slider>
      </v-card>
    </v-row> -->
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TouchPad from '~/components/TouchPad.vue'

export default {
  components: {},
  data() {
    return {
      speed: this.$store.state.settings.touchSpeed * 10,
      accel: this.$store.state.settings.touchAccel * 100,
    }
  },
  methods: {
    ...mapActions({
      setTouchAccel: 'settings/setTouchAccel',
      setTouchSpeed: 'settings/setTouchSpeed',
    }),
  },
  watch: {
    speed(newVal) {
      this.setTouchSpeed(newVal / 10)
    },
    accel(newVal) {
      this.setTouchAccel(newVal / 100)
    },
  },
}
</script>
