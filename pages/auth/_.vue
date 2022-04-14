<template>
  <main />
</template>

<script>
export default {
  middleware({ redirect }) {
    redirect('/auth/login')
  },
}
</script>
