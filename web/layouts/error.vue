<template lang="pug">
  div.container.center-align
    h1(v-if="error.statusCode === 404") Page Not Found
    h1(v-else) An error occured.
    NuxtLink(to="/") Go back home
</template>

<script>
export default {
  name: 'ErrorPage',
  props: {
    error: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
