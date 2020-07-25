<template>
  <v-app @resize="resize">
    <SnackBar />
    <TimerControl />
    <MagnifierControl />

    <v-main :class="`bg ${uiLandscape ? 'landscape' : 'portrait'}`">
      <nuxt />
    </v-main>

    <v-bottom-navigation
      dark
      ref="drawer"
      app
      fixed
      height="56"
      :class="`bottom-bar ${
        uiLandscape
          ? 'bottom-bar--landscape align-center'
          : 'bottom-bar--portrait justify-space-center'
      }  bottom-bar `"
    >
      <v-btn
        v-for="(button, index) in buttons"
        :key="button.title"
        :to="button.to"
        :class="actives[index] ? 'v-btn--highlight' : undefined"
        :active="actives[index]"
        min-width="56"
        small
        :nuxt="button.nuxt"
        @click="button.click && button.click()"
        :input-value="button.inputValue"
      >
        <v-icon>{{ button.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <ShutdownDialog />
    <VolumeControl v-if="showVolumeControl" />
    <CommandsControl v-if="showCommands" @closeMe="showCommands = false" />
    <KeyboardControl v-if="showKeyboard" />
  </v-app>
</template>

<script>
import VolumeControl from '~/components/controls/Volume.vue'
import TimerControl from '~/components/controls/Timer.vue'
import MagnifierControl from '~/components/controls/Magnifier'
import CommandsControl from '~/components/controls/Commands'
import KeyboardControl from '~/components/controls/Keyboard'

import TouchPad from '~/components/TouchPad.vue'
import SnackBar from '~/components/SnackBar.vue'
import ShutdownDialog from '~/components/ShutdownDialog'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    VolumeControl,
    CommandsControl,
    KeyboardControl,
    TouchPad,
    MagnifierControl,
    TimerControl,
  },
  data() {
    return {
      showVolumeControl: false,
      showCommands: false,
      showKeyboard: false,
      title: 'Wireless Keyboard',
    }
  },
  computed: {
    ...mapState({ uiLandscape: (state) => state.device.uiLandscape }),
    actives() {
      return [
        this.showKeyboard,
        this.showCommands,
        this.showVolumeControl,
        this.$route.path === '/settings',
      ]
    },

    buttons() {
      this.$route.path
      return [
        {
          icon: 'mdi-keyboard',
          title: 'Keyboard',
          click: () => {
            this.showKeyboard = !this.showKeyboard
          },
        },
        {
          icon: 'mdi-application',
          title: 'Command',
          click: () => {
            this.showVolumeControl = false
            this.showCommands = !this.showCommands
          },
          inputValue: this.showCommands,
        },

        {
          icon: 'mdi-volume-high',
          title: 'Volume',
          click: () => {
            this.showCommands = false
            this.showVolumeControl = !this.showVolumeControl
          },
          inputValue: this.showVolumeControl,
        },
        {
          icon: 'mdi-tune',
          title: 'Settings',
          to: this.$route.path === '/settings' ? '/' : '/settings',
        },
      ]
    },
  },
  methods: {
    ...mapActions({ setUiLandscape: 'device/setUiLandscape' }),
    resize(event) {},
    setLandScapeMode() {
      this.setUiLandscape(
        document.documentElement.clientWidth >
          document.documentElement.clientHeight
      )
    },
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener('resize', this.setLandScapeMode)
      this.setLandScapeMode()
    })
  },
  watch: {
    $route(to, from) {
      this.setLandScapeMode()
    },
  },
}
</script>
<style scoped>
.bg {
  background: url('/carbon.jpg') no-repeat center center;
  background-size: cover;
}
.portrait {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 56px);
  padding: 0 !important;
}
.landscape {
  left: 0;
  top: 0;
  position: absolute;
  width: calc(100% - 56px);
  height: 100%;
}
.bottom-bar--portrait {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}
.bottom-bar--landscape {
  border-left: 1px solid rgba(255, 255, 255, 0.12);
  height: 100% !important;
  transform: none;
  width: 56px;
  top: 0;
  right: 0;
  left: unset;
  flex-direction: column-reverse;
}
.bottom-bar--landscape >>> .v-btn {
  min-width: 56px;
  max-height: 56px;
  height: 56px;
}
.v-btn::before {
  background-color: transparent !important;
}
.v-btn--active {
  color: rgba(255, 255, 255, 0.7) !important;
}
.bottom-bar >>> .v-btn.v-btn--highlight {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
