<template>
  <main></main>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  middleware: ({ redirect }) => redirect('/account/settings'),
})
</script>
