<template>
  <b-navigation :offcanvas="!navActive" hide-toggle-button>
    <store-meta slot="footer" />
    <b-menu router class="tunw">
      <b-menu-item
        v-for="item in items"
        :key="item.index"
        :title="item.title"
        :icon="item.icon"
        :index="item.index"
      />
    </b-menu>
  </b-navigation>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AppNavigation',
  data() {
    return {
      items: [
        {
          index: '/',
          title: 'Dashboard',
          icon: 'home',
        },
        {
          index: '/orders',
          title: 'My Orders',
          icon: 'cooking',
        },
        {
          index: '/weekly-statements',
          title: 'Weekly Statements',
          icon: 'document',
        },
        {
          index: '/food-safety-n-qa',
          title: 'Food Safety & QA',
          icon: 'information',
        },
        {
          index: '/training',
          title: 'Training',
          icon: 'book',
        },
        {
          index: '/contract-details',
          title: 'Contract Details',
          icon: 'document',
        },
      ],
    }
  },
  computed: {
    ...mapState('common', ['navActive']),
  },
}
</script>
