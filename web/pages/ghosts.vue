<template lang="pug">
div.container.flow
  BaseBackButton(@click="$router.go(-1)") New Search
  GhostsList
</template>

<script>
export default {
  name: 'SearchResultsPage',
  auth: false,
  beforeRouteLeave(to, from, next) {
    if (to.path === '/login') {
      const cookie = encodeURIComponent(from.fullPath)
      document.cookie = `auth.redirect=${cookie}; path=/`
      next()
    } else {
      next()
    }
  },
}
</script>
