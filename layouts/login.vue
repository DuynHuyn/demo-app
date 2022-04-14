<template>
  <div class="b-login-container">
    <div class="ctnf">
      <div class="df hmn100vh fic fcc">
        <div class="b-login-form-container">
          <img
            src="/branding.jpg"
            alt="Yummi Partner"
            class="b-login-app-branding"
          />
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginLayout',
})
</script>
