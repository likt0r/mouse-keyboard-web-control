<template>
  <v-snackbar
    v-model="show"
    top
    :timeout="snackbar && snackbar.timeout"
    :color="snackbar && snackbar.color"
  >
    {{ snackbar && snackbar.message }}

    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="show = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: function () {
    return {
      show: false,
    }
  },
  computed: {
    ...mapState({
      snackbar: (state) => state.snackbar.snack,
    }),
  },
  watch: {
    snackbar(newS) {
      if (newS) {
        this.show = true
      }
    },
  },
  methods: {},
}
</script>
