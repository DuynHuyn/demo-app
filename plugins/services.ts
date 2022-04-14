import { Context, Inject } from '@nuxt/types/app'
import { createServices, ServicesInstance } from '~/services'

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $services: ServicesInstance
  }
  interface Context {
    $services: ServicesInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $services: ServicesInstance
    $message: any
  }
}

declare module 'vuex/types/index' {
  // this.$myInjectedFunction inside Vuex stores
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $services: ServicesInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $message: any
  }
}

export default (ctx: Context, inject: Inject) => {
  inject('services', createServices(ctx.$axios))
}
