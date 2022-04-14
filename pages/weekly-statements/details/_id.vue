<template>
  <main>
    <page-header />
    <div class="row items-center mt-6x">
      <div class="col-auto col-sm-auto">
        <b-button-icon
          name="arrow-left"
          @click.prevent="$router.push(`/weekly-statements`)"
        ></b-button-icon>
      </div>
      <div class="col">
        <h1>View Details</h1>
      </div>
      <div class="col-sm-auto d-flex items-center">
        <b-button primary small prefix-icon="print">Export to PDF</b-button>
        <b-tag type="default" class="ml-2x py-2x" large
          >March 03 , 2022 - March 10, 2022</b-tag
        >
      </div>
    </div>
    <div class="row content-center mt-6x">
      <div class="col-auto">Excel file</div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'WeeklyStatementsDetailsPage',
  meta: {
    breadcrumb: 'Weekly Statements/Details',
  },
  head: {
    title: 'Weekly Statements Details',
  },
})
</script>
