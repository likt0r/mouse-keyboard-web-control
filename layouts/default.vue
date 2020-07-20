<template>
  <v-app dark @resize="resize">
    <v-bottom-navigation v-if="!uiLandscape" dark app fixed router>
      <v-btn v-for="button in buttons" :key="button.title" :to="button.to">
        <!-- <span>{{ button.title }}</span> -->
        <v-icon>{{ button.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-navigation-drawer
      v-if="uiLandscape"
      dark
      mini-variant
      mini-variant-width="56"
      permanent
      stateless
      fixed
      mandatory
    >
      <v-list dense nav>
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

    <v-main :style="uiLandscape ? 'padding-left: 56px' : ''">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import TouchPad from '~/components/TouchPad.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    TouchPad,
  },
  data() {
    return {
      bottomNav: 0,
      clipped: false,
      drawer: false,
      fixed: false,
      buttons: [
        {
          icon: 'mdi-mouse',
          title: 'Mouse',
          to: '/',
        },
        {
          icon: 'mdi-keyboard',
          title: 'Keyboard',
          to: '/keyboard',
        },
        {
          icon: 'mdi-function',
          title: 'Fn Keys',
          to: '/fn',
        },
        {
          icon: 'mdi-tune',
          title: 'Settings',
          to: '/settings',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  computed: {
    ...mapState({ uiLandscape: (state) => state.device.uiLandscape }),
  },
  methods: {
    ...mapActions({ setUiLandscape: 'device/setUiLandscape' }),
    resize(event) {
      console.log(event)
    },
    setLandScapeMode() {
      this.setUiLandscape(
        document.documentElement.clientWidth >
          document.documentElement.clientHeight &&
          this.$route.name !== 'keyboard'
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
