export const auth = {
  redirect: {
    login: '/auth/login',
    logout: '/auth/login',
    home: '/',
  },
  rewriteRedirects: false,
  strategies: {
    local: {
      scheme: 'refresh',
      token: {
        property: 'access_token',
        maxAge: 60 * 60,
      },
      refreshToken: {
        property: 'refresh_token',
        data: 'refresh_token',
        maxAge: 60 * 60 * 24 * 30,
      },
      user: {
        property: false,
      },
      clientId: '1STPARTY.APP',
      clientSecret: 'P@ss4FirstPartyApp',
      grantType: 'password',
      scope:
        'resourceApi offline_access profile fileServiceApi notificationApi',
      autoLogout: false,
      endpoints: {
        login: {
          url: '/connect/token',
          method: 'post',
          headers: {
            'System-Id': process.env.NUXT_ENV_SYSTEM_ID,
          },
        },
        refresh: {
          url: '/connect/token',
          method: 'post',
          headers: {
            'System-Id': process.env.NUXT_ENV_SYSTEM_ID,
          },
        },
        user: {
          url: '/v1/Identity/Account/Profile',
          method: 'get',
          headers: {
            'System-Id': process.env.NUXT_ENV_SYSTEM_ID,
          },
        },
        logout: false,
      },
    },
  },
  plugins: ['@/core/plugins/auth.ts'],
}
