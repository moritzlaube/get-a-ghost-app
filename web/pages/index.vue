<template lang="pug">
  div 
    SearchForm
    pre 
      code {{isAuthenticated}}
      br
      code {{loggedInUser}}
    button(@click="logout") Logout
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Homepage',
  auth: false,
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style lang="scss" scoped>
.date-range {
  display: flex;
  align-items: center;
}

.date-range__arrow {
  display: flex;
  padding: var(--space-sm);
  color: (--var-text-light);
}
</style>

<style lang="scss">
.vc-container.vc-is-dark {
  background-color: var(--bg-dark-grey) !important;
  border-color: var(--mid-grey);
}
</style>
