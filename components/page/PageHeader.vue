<template>
  <div class="r rsm mb6x" :class="{ fic: !subTitle }">
    <div v-if="showBackButton" class="ca">
      <b-button-icon
        name="arrow-left"
        :class="{ mt1x: subTitle }"
        @click.prevent="$router.back()"
      />
    </div>

    <div class="c">
      <slot name="left">
        <h1 v-if="title">{{ title }}</h1>
        <p v-if="subTitle" class="cg6 ts2xl fw6">{{ subTitle }}</p>
      </slot>
    </div>
    <div v-if="$slots.default" class="ca">
      <slot></slot>
    </div>
    <div v-if="!hideOrderButton" class="ca">
      <b-button
        primary
        small
        suffix-icon="arrow-right"
        native-tag="nuxt-link"
        :extend-props="{ to: '/orders/create' }"
        >Create Order</b-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PageHeader',
  props: {
    hideOrderButton: {
      type: Boolean,
      default: false,
    },
    showBackButton: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
  },
})
</script>
