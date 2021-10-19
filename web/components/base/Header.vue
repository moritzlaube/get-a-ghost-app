<template lang="pug">
header
  NotificationToast(:loggedInUser="loggedInUser ? loggedInUser : null")
  div.container
    NuxtLink(to="/" style="display: flex; max-width: 65%;")
      BaseGhostLogo
    div(v-if="isAuthenticated" tabindex="0" @blur="navIsOpen = false" @keyup.enter="navIsOpen = !navIsOpen")
      BaseProfileIcon(:isOpen="navIsOpen" @click="navIsOpen = !navIsOpen") {{ loggedInUser.profile.initials }}
      BaseNav(:isOpen="navIsOpen" @close="navIsOpen = false")
    NuxtLink(v-else to="/login").login
      svg(xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor")
        path(fill="none" d="M0 0h24v24H0z")
        path(d="M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-8v2h8v14z")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BaseHeader',
  data() {
    return {
      navIsOpen: false,
    }
  },
  computed: {
    ...mapGetters(['loggedInUser', 'isAuthenticated']),
  },
}
</script>

<style lang="scss" scoped>
header {
  box-shadow: 0 12px 12px -2px var(--shadow-dark);
  margin-bottom: var(--space-sm);
}

header > div {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-xl) var(--space-sm);
}

.login {
  display: flex;
  color: var(--text-light);
  padding: var(--space-xs);
}
</style>
