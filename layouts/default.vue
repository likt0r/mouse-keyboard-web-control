<template>
  <v-app dark @resize="resize">
    <v-bottom-navigation v-if="!landScapeMode" dark app fixed router>
      <v-btn v-for="button in buttons" :key="button.title" :to="button.to">
        <!-- <span>{{ button.title }}</span> -->
        <v-icon>{{ button.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-navigation-drawer
      v-if="landScapeMode"
      dark
      mini-variant
      mini-variant-width="56"
      router
      permanent
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

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TouchPad from '~/components/TouchPad.vue'
export default {
  components: {
    TouchPad,
  },
  data() {
    return {
      landScapeMode: true,
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
  methods: {
    resize(event) {
      console.log(event)
    },
    setLandScapeMode() {
      this.landScapeMode =
        document.documentElement.clientWidth >
        document.documentElement.clientHeight
      console.log('set LandScapeMode', this.landScapeMode)
    },
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener('resize', this.setLandScapeMode)
      this.setLandScapeMode()
    })
  },
}
</script>
