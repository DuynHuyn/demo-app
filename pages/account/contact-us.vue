<template>
  <main>
    <page-header title="Contact Us" />

    <b-card class="mt-6x">
      <div class="r">
        <div class="col-lg">
          <div class="df fc fic h100p">
            <div class="fg1 df fic fcc">
              <img
                src="/branding.jpg"
                alt="Yummi Partner"
                class="h-200 w-200"
              />
            </div>
            <div>
              <b-form-item label="Address">
                <b-form-item-text>
                  <span>14043 Distribution Way, Farmers Branch, TX, 75234</span>

                  <b-button-icon
                    slot="suffix"
                    name="copy"
                    primary
                    ghost
                    small
                    class="ml-1x"
                  />
                </b-form-item-text>
              </b-form-item>
              <div class="row">
                <div class="col">
                  <b-form-item label="Phone Number">
                    <b-form-item-text> 469-213-2595</b-form-item-text>
                    <b-form-item-text> 972-402-9498</b-form-item-text>
                  </b-form-item>
                </div>
                <div class="col">
                  <b-form-item label="Fax">
                    <b-form-item-text> 480-393-4642</b-form-item-text>
                  </b-form-item>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-auto">
          <b-divider vertical class="d-none d-lg-block"></b-divider>
          <b-divider class="d-lg-none my-6x"></b-divider>
        </div>
        <div class="col-lg">
          <h2>Let us know what we can help you...</h2>
          <b-form-item label="Your Name">
            <b-input placeholder="Enter your your name" />
          </b-form-item>
          <b-form-item label="Email Address">
            <b-input placeholder="Enter your email address" />
          </b-form-item>
          <b-form-item label="Subject">
            <b-input
              placeholder="Enter the subject (Billing, Orders, Status, Payment,...)"
            />
          </b-form-item>
          <b-form-item label="Message">
            <b-input
              type="textarea"
              placeholder="Enter your message"
              :rows="6"
            />
          </b-form-item>
          <b-form-item label="File Attachments" info="Smaller than 40MB">
            <b-input placeholder="Submit your PDF, Word, Excel, JPG file here">
              <template #suffix>
                <b-button-icon small name="upload"></b-button-icon>
              </template>
            </b-input>
          </b-form-item>

          <div class="mt-6x d-flex content-end">
            <b-button primary>Submit</b-button>
          </div>
        </div>
      </div>
    </b-card>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ContactUsPage',
  meta: {
    breadcrumb: 'Contact Us',
  },
  head: {
    title: 'Contact Us',
  },
})
</script>
