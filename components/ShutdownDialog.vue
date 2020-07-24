<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="headline">Set shutdown time</v-card-title>

      <v-card-text>
        <v-row>
          <v-text-field single-line type="number" v-model="minutes">
            <v-icon slot="append" color="red" @click="increment"
              >mdi-plus</v-icon
            >
            <v-icon slot="prepend" color="green" @click="decrement"
              >mdi-minus</v-icon
            >
          </v-text-field>
        </v-row>
        <v-row class="d-flex justify-center align-stretch">
          <v-btn
            v-for="option in options"
            :key="option"
            min-width="20"
            @click="minutes = option"
          >
            {{ option }}
          </v-btn>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="dialog = false">
          Cancel
        </v-btn>

        <v-btn color="green darken-1" text @click="click()">
          shutdown
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {},
  data: function () {
    return {
      minutes: 0,
      options: [5, 15, 30, 60, 120],
      dialog: false,
    }
  },
  computed: {
    ...mapState({
      uiLandscape: (state) => state.device.uiLandscape,
      showDialog: (state) => state.shutdown.showDialog,
    }),
  },
  methods: {
    click() {
      console.log('', this.minutes)
      this.$store.dispatch('shutdown/startTimer', { minutes: this.minutes })
      this.dialog = false
    },
    decrement() {
      if (this.minutes > 0) this.minutes = this.minutes - 1
    },
    increment() {
      this.minutes = this.minutes + 1
    },
  },
  async mounted() {
    this.minutes = 0
  },
  watch: {
    dialog(value, oldValue) {
      this.$store.dispatch('shutdown/showDialog', { show: value })
    },
    showDialog(value) {
      this.dialog = value
    },
  },
}
</script>
<style scoped></style>
