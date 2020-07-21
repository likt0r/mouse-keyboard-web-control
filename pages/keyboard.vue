<template>
  <v-container
    class="fill-height pa-0 align-center justify-end flex-column"
    overflow-hidden
    fluid
    ref="cont"
  >
    <!-- <v-textarea
      outlined
      name="input-7-4"
      ref="input"
      style="color: white;"
      @input="onKeyPress"
      v-model="input"
      autocapitalize="none"
      class="keyInput"
    ></v-textarea>-->

    <TouchPad
      class="touchPad align-self-auto align-content-stretch"
      :style="`width: 100%; flex:1`"
    />
    <client-only>
      <SimpleKeyboard ref="keyboard" @key="onKey" :theme="theme" />
    </client-only>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import SimpleKeyboard from '~/components/SoftKeyboard'

export default {
  components: {
    SimpleKeyboard,
  },
  data: () => ({
    theme: 'hg-theme-default greenDark',
  }),
  methods: {
    onKey(code) {
      console.log('onKEyx')
      this.$axios.post('/api/keyboard/key', {
        code: code,
      })
    },
  },
  mounted() {},
}
</script>
<style></style>
