<template lang="pug">
  div.toast-bg(v-if="loggedInUser.emailVerified && !loggedInUser.emailVerified" :class="{'toast-active': loggedInUser.emailVerified && !loggedInUser.emailVerified}")
      .container
        span Please follow this 
        NuxtLink(to="/verify") link
        span &nbsp; to verify your email.
</template>

<script>
export default {
  name: 'NotificationToast',
  props: {
    loggedInUser: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.toast-bg {
  position: relative;
  background-color: var(--clr-pink);
  padding: 0;
  bottom: 50%;

  & > div {
    width: 100%;
  }

  & a {
    color: var(--text-light);
  }
}
</style>
