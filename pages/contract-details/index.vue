<template>
  <main>
    <page-header>
      <h1>Contract Details</h1>
    </page-header>

    <div class="row">
      <div class="col-lg-6">
        <b-card class="mt-6x">
          <div class="row">
            <div class="col-sm-6">
              <b-form-item label="Acquired Date">
                <b-form-item-text> February 10, 2020</b-form-item-text>
              </b-form-item>
            </div>
            <div class="col-sm-6">
              <b-form-item label="Contract Start Date">
                <b-form-item-text> March 05, 2020</b-form-item-text>
              </b-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <b-form-item label="Percentage of Profit Sharing">
                <b-form-item-text> 10%</b-form-item-text>
              </b-form-item>
            </div>
            <div class="col-sm-6">
              <b-form-item label="Duration of contract">
                <b-form-item-text> 1 year</b-form-item-text>
              </b-form-item>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-6">
              <b-form-item label="Weekly Management Fee">
                <b-form-item-text> $30.00</b-form-item-text>
              </b-form-item>
            </div>
            <div class="col-sm-6">
              <b-form-item label="Monthly BOHA Machine Rent">
                <b-form-item-text> $100.00</b-form-item-text>
              </b-form-item>
            </div>
          </div>
        </b-card>
      </div>

      <div class="col-lg-6">
        <b-card class="mt-6x">
          <h2>File Attachments</h2>
          <div class="row mt-2x">
            <div class="d-flex content-start">
              <b-button class="w-160 d-block">
                <b-icon name="folder" :size="64" class="c-yellow-3" />
                <div class="d-flex content-center">
                  <p>Contractor Protocol</p>
                </div>
                <div class="d-flex content-center">
                  <small>Uploaded by Yummi</small>
                </div>
              </b-button>
            </div>
          </div>
        </b-card>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ContractDetailsPage',
  meta: {
    breadcrumb: 'Contract Details',
  },
  head: {
    title: 'Contract Details',
  },
})
</script>
