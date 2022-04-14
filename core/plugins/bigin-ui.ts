import Vue from 'vue'
// @ts-ignore
import BiginUI from '@bigin/bigin-ui-vue'
import { Context } from '@nuxt/types'

// Must declare at each project (some doesn't use BDS)
// declare module 'vue/types/vue' {
//   interface Vue {
//     $message: any
//   }
// }

export default ({ app }: Context) => {
  return Vue.use(BiginUI, {
    i18n: (key: any, value: any) => app.i18n.t(key, value),
  })
}
