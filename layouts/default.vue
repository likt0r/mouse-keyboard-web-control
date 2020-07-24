<template>
  <v-app @resize="resize">
    <SnackBar />
    <TimerDisplay />
    <Magnifier />
    <v-navigation-drawer
      v-if="uiLandscape"
      dark
      right
      mini-variant
      mini-variant-width="56"
      permanent
      fixed
      mandatory
    >
      <v-list
        dense
        nav
        class="d-flex flex-column-reverse justify-space-between fill-height"
      >
        <v-list-item
          v-for="button in buttons"
          :key="button.title"
          :to="button.to"
        >
          <v-list-item-action>
            <v-icon>{{ button.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ button.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main :class="`bg ${uiLandscape ? 'landscape' : 'portrait'}`">
      <nuxt />
    </v-main>

    <v-bottom-navigation
      v-if="!uiLandscape"
      dark
      app
      fixed
      router
      height="56"
      class="bottom-bar justify-space-between"
    >
      <v-btn
        v-for="button in buttons"
        :key="button.title"
        :to="button.to"
        min-width="56"
        small
        :nuxt="button.nuxt"
        @click="button.click && button.click()"
        :input-value="button.inputValue"
      >
        <!-- <span>{{ button.title }}</span> -->
        <v-icon>{{ button.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <ShutdownDialog />
    <VolumeControl v-if="showVolumeControl" />
    <Commands v-if="showCommands" @closeMe="showCommands = false" />
  </v-app>
</template>

<script>
import TouchPad from '~/components/TouchPad.vue'
import VolumeControl from '~/components/VolumeControl.vue'
import Commands from '~/components/Commands'
import SnackBar from '~/components/SnackBar.vue'
import TimerDisplay from '~/components/TimerDisplay.vue'
import Magnifier from '~/components/Magnifier'
import ShutdownDialog from '~/components/ShutdownDialog'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    TouchPad,
    Commands,
    Magnifier,
    TimerDisplay,
  },
  data() {
    return {
      bottomNav: 0,
      clipped: false,
      drawer: false,
      fixed: false,
      showVolumeControl: false,
      showCommands: false,
      buttons: [
        {
          icon: 'mdi-mouse',
          title: 'Mouse',
          to: '/',
          nuxt: true,
        },
        {
          icon: 'mdi-keyboard',
          title: 'Keyboard',
          to: '/keyboard',
          nuxt: true,
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
          to: '/settings',
          nuxt: true,
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Wireless Keyboard',
    }
  },
  computed: {
    ...mapState({ uiLandscape: (state) => state.device.uiLandscape }),
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
.bottom-bar {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}
</style>
