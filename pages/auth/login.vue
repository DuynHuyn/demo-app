<template>
  <b-card :shadow="2" class="w360 wmx100p mt6x">
    <h2>Sign in</h2>
    <form class="mt2x" @submit.prevent="handleUserLogin">
      <b-form-item label="Email" :error="$validationMessage('email', $v.email)">
        <b-input v-model.trim="email" placeholder="Enter your email" />
      </b-form-item>
      <b-form-item
        label="Password"
        :error="$validationMessage('password', $v.password)"
      >
        <b-input
          v-model.trim="password"
          placeholder="Enter your password"
          show-password
        />
      </b-form-item>
      <b-inline-message v-if="error" error class="mt4x">
        <p>{{ error }}</p>
      </b-inline-message>
      <div class="mt-4x">
        <b-button ghost small @click.prevent="$router.push('forgot-password')"
          >Forgot your password?</b-button
        >
      </div>
      <div class="df fce mt6x">
        <b-button
          type="submit"
          primary
          suffix-icon="arrow-right"
          :loading="busy"
          >Access</b-button
        >
      </div>
    </form>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'

const isDev = process.env.NODE_ENV !== 'production'

export default Vue.extend({
  name: 'LoginPage',
  auth: 'guest',
  data() {
    return {
      email: isDev ? 'tam.mai@bigin.vn' : '',
      password: isDev ? '%{oT05' : '',
      error: '',
      busy: false,
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  methods: {
    ...mapActions('common', ['setLoading']),
    async handleUserLogin() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          this.busy = true
          // Log user in
          await this.$auth.loginWith('local', {
            data: {
              username: this.email,
              password: this.password,
            },
          })

          // // Set user's preffered language
          // if (this.$auth.user && this.$auth.user.preferencedLang) {
          //   const locale = this.$i18n.locales.find(
          //     (locale) => locale.iso === this.$auth.user.preferencedLang
          //   )

          //   if (locale) {
          //     this.$i18n.setLocale(locale.code)
          //   }
          // }
        } catch (error) {
          this.error = 'Your account information was entered incorrectly.'
        } finally {
          this.busy = false
        }
      }
    },
  },
})
</script>
