<template>
  <b-header :shadow="1">
    <div slot="branding" class="df fic">
      <b-button-icon
        name="nav"
        class="d-sm-none"
        :class="{ active: navActive }"
        @click.prevent="setNavActive(!navActive)"
      />
      <nuxt-link slot="branding" to="/">
        <img src="/branding.jpg" alt="Yummi Partner" class="clickable" />
      </nuxt-link>
    </div>
    <div slot="left" class="dn sm:df fic">
      <div>
        <nuxt-link :to="$auth.options.redirect.home">
          <b-icon name="home"></b-icon>
        </nuxt-link>
      </div>
      <div v-for="item in breadcrumbs" :key="item.path" class="df fic">
        <b-icon class="mx1x" name="chevron-right" size="12"></b-icon>
        <nuxt-link :to="item.path" class="tssm fw6 cg7">
          <span>{{ item.title }}</span>
        </nuxt-link>
      </div>
    </div>
    <div slot="right" class="df">
      <b-dropdown slot="right" trigger="click" @command="handleCommand">
        <div
          class="df fic p05x bdrmax bgg2 hv:bgp1 fc:bgp1 hv:cp3 fc:cp3 csp tsa025s"
        >
          <b-avatar
            v-if="user"
            :src="user.avatar"
            :text="user.fullName"
            rounded
          />
          <p class="text-sm text-semibold px-2x">My Account</p>
          <b-icon name="action-down" size="12" class="mr1x"></b-icon>
        </div>
        <b-dropdown-menu slot="dropdown" small class="wmn160">
          <b-dropdown-item icon="store" command="franchisee">
            Franchisee Details
          </b-dropdown-item>
          <b-dropdown-item icon="profile" command="settings">
            Account Settings
          </b-dropdown-item>
          <b-dropdown-item icon="mail" command="contact">
            Contact Us
          </b-dropdown-item>
          <b-dropdown-item icon="sign-out" command="logout">
            Sign Out
          </b-dropdown-item>
        </b-dropdown-menu>
      </b-dropdown>
      <!-- <b-badge is-dot>
        <b-button-icon rounded class="ml3x" name="notifications-on" />
      </b-badge> -->
    </div>
  </b-header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AppHeader',
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('common', ['navActive']),
    ...mapState('account', ['franchisee']),
    breadcrumbs() {
      const excludedURLs = [
        this.$auth.options.redirect.home,
        this.$auth.options.redirect.home + '/',
        // this.$route.path,
      ]
      // console.log(this.$route.matched)
      return this.$route.matched
        .map((item) => {
          const { path, components } = item
          const options = components.default.extendOptions
          const title = options && options.meta ? options.meta.breadcrumb : ''
          return {
            path,
            title,
          }
        })
        .filter(
          (item) =>
            !excludedURLs.includes(item.path) &&
            // !item.path.includes(':') &&
            item.title !== ''
        )
    },
  },

  methods: {
    ...mapActions('common', ['setNavActive']),
    handleCommand(command) {
      switch (command) {
        case 'franchisee':
          return this.$router.push('/account/franchisee-details')
        case 'settings':
          return this.$router.push('/account/settings')
        case 'contact':
          return this.$router.push('/account/contact-us')
        case 'logout':
          return this.$auth.logout()
      }
    },
  },
}
</script>
