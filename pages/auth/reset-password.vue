<template>
  <b-card :shadow="2" class="w-360 w-max-100p mt-6x">
    <h2>Create password</h2>
    <div v-if="!submitted">
      <p class="text-md mt-6x">
        You are creating password for account using email
        <strong>{{ email }}</strong
        >. And please following istruction below to complete this process.
      </p>
      <div class="bdr-rds-2x bg-grey-1 px-3x py-4x mt-2x">
        <ul class="ul text-semibold text-sm">
          <li
            :class="{
              'c-green-3': password.length && $v.password.minLength,
            }"
          >
            Contains at least 8 characters
          </li>
          <li
            :class="{
              'c-green-3': password.length && $v.password.containsSpecial,
            }"
          >
            Contains at least 1 special character
          </li>
          <li
            :class="{
              'c-green-3': password.length && $v.password.containsCapital,
            }"
          >
            Contains at least 1 capital character
          </li>
          <li
            :class="{
              'c-green-3': password.length && $v.password.containsAlphaAndNum,
            }"
          >
            Contains both numeric and text characters
          </li>
        </ul>
      </div>
      <form class="mt-2x" @submit.prevent="handleFormSubmit">
        <b-form-item
          label="Password"
          :error="$validationMessage('password', $v.password)"
        >
          <b-input
            v-model.trim="password"
            show-password
            placeholder="Type your password here"
          />
        </b-form-item>
        <b-form-item
          label="Re-type password"
          :error="$validationMessage('retypePassword', $v.retypePassword)"
        >
          <b-input
            v-model.trim="retypePassword"
            show-password
            placeholder="Re-type your password here"
          />
        </b-form-item>
        <div class="d-flex content-end mt-6x">
          <b-button type="submit" primary>Reset password</b-button>
        </div>
      </form>
    </div>
    <div v-else>
      <b-inline-message success class="mt-6x">
        <p>It's good to be back! Your new password has just set.</p>
      </b-inline-message>
      <div class="d-flex content-end">
        <b-button
          primary
          class="mt-6x"
          @click.prevent="$router.replace('/auth/login')"
          >Return to Login</b-button
        >
      </div>
    </div>
  </b-card>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import {
  containsAlphaAndNum,
  containsCapital,
  containsSpecial,
} from '@/core/modules/vuelidate/validators/custom'
import { REGEX_PATTERNS } from '@/core/constants'

export default {
  name: 'ResetPasswordPage',
  auth: false,
  validate({ route }) {
    const { userid, code } = route.query
    const validUserId = REGEX_PATTERNS.UUID_V4.test(userid)
    return validUserId && code
  },
  data() {
    return {
      email: 'user@domain.com',
      password: '',
      retypePassword: '',
      userId: '',
      token: '',
      submitted: false,
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(8),
      containsAlphaAndNum,
      containsCapital,
      containsSpecial,
    },
    retypePassword: {
      required,
      sameAs: sameAs('password'),
    },
  },
  mounted() {
    const { userid, code, email } = this.$route.query

    this.userId = userid
    this.email = email
    // Accident when decode querystring
    this.token = code.replaceAll(' ', '+')
  },
  methods: {
    async handleFormSubmit() {
      const { userId, password, token } = this

      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          const success = await this.$services.identity.resetPassword({
            userId,
            password,
            token,
          })

          if (success) {
            this.submitted = true
          } else {
            this.$message.error('This request had been expired!')
          }
        } catch (error) {
          this.$message.error('Something went wrong!')
        }
      }
    },
  },
}
</script>
