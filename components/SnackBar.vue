<template>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="show"
      top
      :timeout="5555555555"
      :color="snackbar && snackbar.color"
    >
      {{ snackbar && snackbar.message }}

      <v-btn text @click="show = false">
        close
      </v-btn>
    </v-snackbar>
  </div>
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
justify-content: space-between; display: flex; align-content: center;
text-align: center; align-items: stretch; }
