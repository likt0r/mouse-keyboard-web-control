<template>
  <v-btn
    small
    fab
    fixed
    top
    outlined
    :right="!uiLandscape"
    :left="uiLandscape"
    @click="click()"
  >
    <v-icon>{{ active ? 'mdi-magnify-close' : 'mdi-magnify' }}</v-icon>
  </v-btn>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {},
  data: function () {
    return {
      active: false,
    }
  },
  computed: {
    ...mapState({
      uiLandscape: (state) => state.device.uiLandscape,
    }),
  },
  methods: {
    click() {
      this.active = !this.active
    },
  },
  async mounted() {
    const { data } = await this.$axios.get('/api/commands/magnifier')
    this.active = data.active
  },
  watch: {
    async active(active) {
      this.$axios.post('/api/commands/magnifier', { active })
    },
  },
}
</script>
<style scoped></style>
