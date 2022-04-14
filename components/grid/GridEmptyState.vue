<template>
  <b-empty-state
    :min-height="400"
    :illustration="require('~/assets/images/empty-state.svg')"
    :message="message"
  >
    <div slot="message" class="tac mt4x">
      <h3>Empty</h3>
      <p class="cg6 mt2x">{{ message }}</p>
    </div>
    <slot slot="action"></slot>
  </b-empty-state>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'GridEmptyState',
  props: {
    message: {
      type: String,
      default: 'There are no items to display.',
    },
  },
})
</script>
