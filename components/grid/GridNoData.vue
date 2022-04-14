<template>
  <b-empty-state
    :min-height="320"
    :illustration="require('~/assets/images/search-no-results.svg')"
  >
    <div slot="message" class="tac mt4x">
      <h3>No results</h3>
      <p class="cg6 mt2x">{{ message }}</p>
    </div>
  </b-empty-state>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'GridNoData',
  props: {
    message: {
      type: String,
      default: 'There are no items match with search criteria.',
    },
  },
})
</script>
