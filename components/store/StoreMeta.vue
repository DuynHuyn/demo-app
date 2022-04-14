<template>
  <div class="dif px2x py1x bdrmax bgg2">
    <b-form-item-text v-if="inline" icon="store">
      <span class="fw6">{{ franchisee.data.storeInformation.name }}</span>
      <span class="tusep mx1x cg6"></span>
      <span>{{ franchisee.data.storeInformation.code }}</span>
    </b-form-item-text>
    <div v-else class="r rxs fic">
      <div class="ca">
        <div class="w8x h8x bdrmd bgg3 df fic fcc">
          <b-icon name="store" size="20"></b-icon>
        </div>
      </div>
      <div class="c">
        <p class="fw6">{{ franchisee.data.storeInformation.name }}</p>
        <p class="cg6 tssm">{{ franchisee.data.storeInformation.code }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
export default Vue.extend({
  name: 'StoreMeta',
  props: {
    inline: {
      type: Boolean,
      default: false,
    },
  },
  async fetch() {
    if (!this.$store.getters['account/isFetched']) {
      await this.$store.dispatch('account/fetchFranchisee')
    }
  },
  computed: {
    ...mapState('account', ['franchisee']),
  },
})
</script>
