<template>
  <nuxt-child />
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'OrdersPage',
  layout({ route }) {
    if (route.path.includes('orders/pdf')) return 'blank'
    return 'default'
  },
  meta: {
    breadcrumb: 'My Orders',
  },
})
</script>
