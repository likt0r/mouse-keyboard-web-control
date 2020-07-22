<template>
  <Toolbar justify-content="space-between">
    <div min-width="56" height="56"></div>
    <v-btn
      v-for="button in buttons"
      :key="button.title"
      small
      min-width="56"
      height="56"
      color="grey darken-3"
      @click="button.click && button.click()"
    >
      <v-icon>{{ button.icon }}</v-icon>
    </v-btn>
    <div min-width="56" height="56"></div>
  </Toolbar>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import requestThrottel from '~/tools/requestThrottel'
import Toolbar from './Toolbar'
export default {
  components: {
    Toolbar,
  },
  data: function () {
    return {
      buttons: [
        {
          icon: 'mdi-web',
          title: 'Web Browser',
          click: () => {
            this.$axios.post('/api/commands/open', { target: 'browser' })
            this.$emit('closeMe')
          },
        },
        {
          icon: 'mdi-file-tree-outline',
          title: 'File Browser',
          click: () => {
            this.$axios.post('/api/commands/open', { target: 'file' })
            this.$emit('closeMe')
          },
        },
        {
          icon: 'mdi-power',
          title: 'shutdown',
          click: () => {
            this.$axios.post('/api/commands/shutdown', { time: 0 })
            this.$emit('closeMe')
          },
        },
      ],
    }
  },
  computed: {},
  methods: {},
}
</script>
<style scoped>
.large-slider >>> .v-slider {
  height: 90%;
}
.large-slider >>> .v-input__slot {
  height: 100%;
}
</style>
