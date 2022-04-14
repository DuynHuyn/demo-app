<template>
  <div v-if="loading" v-loading="loading" class="pf w100p h100p z4000"></div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>
