<template>
  <v-container :class="`settings ${uiLandscape ? 'pl-16' : 'pt-16'}`" fluid>
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
    <v-row dense>
      <v-col cols="12">
        <v-card dark>
          <v-card-subtitle class="overline mb-4">Keyboard</v-card-subtitle>

          <v-text-field
            class="centered-input ml-6 mr-6"
            single-line
            type="number"
            v-model="keyboardDisplayTimeout"
            center
          >
            <v-icon slot="append" color="red" @click="increment"
              >mdi-plus</v-icon
            >
            <v-icon slot="prepend" color="green" @click="decrement"
              >mdi-minus</v-icon
            >
          </v-text-field>
        </v-card>
      </v-col>
    </v-row>
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
      keyboardDisplayTimeout: this.$store.state.settings.keyboardDisplayTimeout,
    }
  },
  computed: {
    ...mapState({
      uiLandscape: (state) => state.device.uiLandscape,
    }),
  },
  methods: {
    ...mapActions({
      setTouchAccel: 'settings/setTouchAccel',
      setTouchSpeed: 'settings/setTouchSpeed',
      setKeyboardDisplayTimeout: 'settings/setKeyboardDisplayTimeout',
    }),
    decrement() {
      if (this.keyboardDisplayTimeout > 0)
        this.keyboardDisplayTimeout = this.keyboardDisplayTimeout - 1
    },
    increment() {
      this.keyboardDisplayTimeout = this.keyboardDisplayTimeout + 1
    },
  },
  watch: {
    speed(newVal) {
      this.setTouchSpeed(newVal / 10)
    },
    accel(newVal) {
      this.setTouchAccel(newVal / 100)
    },
    keyboardDisplayTimeout(newVal) {
      this.setKeyboardDisplayTimeout(newVal)
    },
  },
}
</script>
<style scoped>
.settings {
  overflow: scroll;
  height: 100vh;
}
.centered-input >>> input {
  text-align: center;
}
</style>
