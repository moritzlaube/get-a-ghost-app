<template lang="pug">
.toast-bg
  div(v-if="loggedInUser && !loggedInUser.emailVerified" :class="{'toast-active': !loggedInUser.emailVerified}")
    .container
      span Please follow this 
      NuxtLink(to="/verify") link
      span &nbsp; to verify your email.
  div(v-if="loggedInUser && loggedInUser.isGhost && !loggedInUser.profile.active" :class="{'toast-active': !loggedInUser.active}")
    .container
      span Please complete your 
      NuxtLink(to="/profile") profile
      span &nbsp; to activate your account.
</template>

<script>
export default {
  name: 'NotificationToast',
  props: {
    loggedInUser: {
      type: Object,
      default: null,
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
