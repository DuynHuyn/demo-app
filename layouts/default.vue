<template>
  <div class="app-container">
    <AppHeader />
    <div
      class="app-body d-flex"
      :class="{
        'app-body--offcanvas-off': !navActive,
        'app-body--offcanvas-on': navActive,
      }"
    >
      <AppNavigation />
      <div class="page-container fg1 por">
        <Nuxt />
        <div
          v-if="navActive"
          class="bgb op25p w100p h100p db sm:dn poa t0x l0x csp z1000"
          @click="setNavActive(false)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  name: 'DefaultLayout',
  computed: {
    ...mapState('common', ['navActive']),
  },
  methods: {
    ...mapActions('common', ['setNavActive']),
  },
})
</script>
