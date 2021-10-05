<template lang="pug">
  div 
    SearchForm
    button(@click="logout") Logout
</template>

<script>
export default {
  name: 'Homepage',
  auth: false,
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
