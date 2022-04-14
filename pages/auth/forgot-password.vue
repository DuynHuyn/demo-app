<template>
  <div class="d-flex content-center w-100p">
    <b-card v-if="!submitted" :shadow="2" class="w-360 w-max-100p mt-6x">
      <div class="d-flex items-center">
        <b-button-icon
          name="arrow-left"
          @click.prevent="$router.push('login')"
        ></b-button-icon>
        <h2 class="ml-2x">Forgot password</h2>
      </div>
      <b-inline-message class="mt-6x">
        <p>
          Please enter the email that you used to log into the system to proceed
          the password recovery process.
        </p>
      </b-inline-message>
      <form class="mt-2x" @submit.prevent="sendResetPasswordLink">
        <b-form-item
          label="Email"
          :error="$validationMessage('email', $v.email) || error"
        >
          <b-input v-model.trim="email" placeholder="Enter your email" />
        </b-form-item>
        <div class="d-flex content-end mt-6x">
          <b-button type="submit" primary>Proceed</b-button>
        </div>
      </form>
    </b-card>
    <b-card v-else :shadow="2" class="w-360 w-max-100p mt-6x">
      <div class="d-flex items-center">
        <!-- <b-button-icon
          name="arrow-left"
          @click.prevent="submitted = false"
        ></b-button-icon> -->
        <h2 class="ml-2x">Check your email</h2>
      </div>
      <b-inline-message success class="mt-6x">
        Congratulations! We've sent you an email included a link which helps
        recovering your password. Please check spam or junk folder if you can't
        find it.
      </b-inline-message>
      <div class="row row-rm">
        <div class="col mt-6x">
          <b-button primary @click.prevent="$router.replace('/auth/login')"
            >Return to Login</b-button
          >
        </div>
        <div class="col mt-6x">
          <b-button @click="sendResetPasswordLink">Resend email</b-button>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { required, email } from 'vuelidate/lib/validators'

export default Vue.extend({
  name: 'ForgotPasswordPage',
  auth: false,
  data() {
    return {
      email: '',
      error: '',
      submitted: false,
    } as {
      email: string
      error: any
      submitted: boolean
    }
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    async sendResetPasswordLink() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          await this.$services.identity.sendResetPasswordLink({
            email: this.email,
          })
          this.submitted = true
        } catch (error) {
          this.error = this.$t('vuelidate.messages.notExisted', [
            this.$t('vuelidate.fields.email'),
          ])
        }
      }
    },
  },
})
</script>
