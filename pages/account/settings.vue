<template>
  <main>
    <page-header title="Account Settings" />

    <!-- Login Security -->
    <div class="row content-center">
      <div class="col-lg-6 col-md-8">
        <b-card class="mt-12x">
          <h2>Login Security</h2>
          <div class="row">
            <div class="col">
              <b-form-item label="First Name">
                <b-input placeholder="Enter your first name" />
              </b-form-item>
            </div>
            <div class="col">
              <b-form-item label="Last Name">
                <b-input placeholder="Enter your last name" />
              </b-form-item>
            </div>
          </div>

          <b-form-item label="Email Address">
            <b-input placeholder="Enter your email address" />
          </b-form-item>
          <b-form-item label="Phone Number">
            <b-input placeholder="Enter your phone number" />
          </b-form-item>
          <b-form-item label="Current Password">
            <b-input show-password placeholder="Enter your current password" />
          </b-form-item>
          <b-form-item label="New Password">
            <b-input show-password placeholder="Enter your new password" />
          </b-form-item>
          <b-form-item label="Confirm New Password">
            <b-input show-password placeholder="Confirm your new password" />
          </b-form-item>
          <div class="d-flex content-end mt-6x">
            <b-button primary>Save</b-button>
          </div>
        </b-card>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AccountSettingsPage',
  meta: {
    breadcrumb: 'Account Settings',
  },
  head: {
    title: 'Account Settings',
  },
})
</script>
