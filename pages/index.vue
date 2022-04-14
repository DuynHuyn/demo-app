<template>
  <main>
    <page-header title="Dashboard" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'IndexPage',
  meta: {
    breadcrumb: 'Dashboard',
  },
  head: {
    title: 'Dashboard',
  },
})
</script>
