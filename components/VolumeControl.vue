<template>
  <Toolbar>
    <v-btn
      small
      min-width="56"
      height="56"
      color="grey darken-3"
      @click="muted = !muted"
    >
      <!-- <span>{{ button.title }}</span> -->
      <v-icon>{{
        muted ? 'mdi-volume-variant-off' : 'mdi-volume-high'
      }}</v-icon>
    </v-btn>
    <v-slider
      v-model="volume"
      :value="volume"
      :min="0"
      :max="100"
      hide-details
      :vertical="uiLandscape"
      vertical-center
      :class="sliderClasses"
    />
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
      muted: false,
      volume: 0,
      volumeThrottel: new requestThrottel({
        axios: this.$axios,
        url: '/api/audio/volume',
        method: 'post',
        accumulator: function (pipeline) {
          return pipeline.slice(-1)[0]
        },
      }),
    }
  },
  computed: {
    ...mapState({
      uiLandscape: (state) => state.device.uiLandscape,
    }),
    sheetClasses() {
      return `d-flex align-stretch ${
        this.uiLandscape
          ? 'landscape-audio flex-column-reverse align-items-stretch'
          : 'portait-audio'
      }`
    },
    sliderClasses() {
      return `large-slider align-center ${this.uiLandscape ? 'pt-2' : ''}`
    },
  },
  methods: {},
  async mounted() {
    const { data } = await this.$axios.get('/api/audio/volume')
    this.volume = data.volume
    const { data: data2 } = await this.$axios.get('/api/audio/mute')
    console.log('Result', data2)
    this.muted = data2.muted
  },
  watch: {
    async volume(volume) {
      this.volumeThrottel.send({ volume })
    },
    async muted(muted) {
      this.$axios.post('/api/audio/mute', { mute: muted })
    },
  },
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
