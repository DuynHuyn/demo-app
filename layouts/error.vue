<template>
  <div class="ctnf df hmn100vh fic fcc">
    <div class="df fc wmx800 fic fcc">
      <div class="r rsm">
        <div class="ca fasc">
          <b-button-icon
            ghost
            primary
            name="home"
            @click.prevent="$router.push('/')"
          />
        </div>
        <div class="ca fasc">
          <h1>{{ error.statusCode === 0 ? 'Err!' : error.statusCode }}</h1>
        </div>
        <div class="ca">
          <b-divider vertical></b-divider>
        </div>
        <div class="c fasc">
          <p class="text-lg c-grey-6">
            {{ error.message || 'Something went wrong ...' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  layout: 'blank',
  props: {
    error: {
      type: Object,
      default() {
        return {
          statusCode: 0,
          message: '',
        }
      },
    },
  },
}
</script>
