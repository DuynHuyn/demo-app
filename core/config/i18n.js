import biginUiEn from '@bigin/bigin-ui-vue/lib/locale/lang/en'
import biginUiVi from '@bigin/bigin-ui-vue/lib/locale/lang/vi'
import { DEFAULT_LOCALE } from '../constants'
import { en, vi } from '../../i18n/locales'

export const i18n = {
  strategy: 'no_prefix',
  detectBrowserLanguage: false,
  locales: [
    { code: 'en', iso: 'en-US' },
    { code: 'vi', iso: 'vi-VN' },
  ],
  defaultLocale: DEFAULT_LOCALE,
  vuex: { syncLocale: true, syncMessages: true },
  vueI18n: {
    fallbackLocale: DEFAULT_LOCALE,
    messages: {
      en: {
        greeting: 'Hello!',
        ...biginUiEn,
        ...en,
      },
      vi: {
        greeting: 'Xin chào!',
        ...biginUiVi,
        ...vi,
      },
    },
  },
}
