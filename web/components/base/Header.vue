<template lang="pug">
header
  div.container
    BaseGhostLogo(style="width: 65%")
    BaseProfileIcon(v-if="isAuthenticated") {{ loggedInUser.userData.initials }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'BaseHeader',
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
  display: flex;
  justify-content: space-between;
  padding: var(--space-xl) var(--space-sm);
}
</style>
