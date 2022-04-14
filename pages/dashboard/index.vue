<template>
  <main>
    <page-header title="Dashboard" />

    <div class="row mt-6x content-space-around">
      <div class="col-auto">
        <b-button primary>My Orders</b-button>
      </div>
      <div class="col-auto">
        <b-button primary>Weekly Statements</b-button>
      </div>
      <div class="col-auto">
        <b-button primary>Contract Details</b-button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'DashboardPage',
  meta: {
    breadcrumb: 'Dashboard',
  },
  head: {
    title: 'Dashboard',
  },
})
</script>
