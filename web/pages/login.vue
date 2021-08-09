<template lang="pug">
div.container.login-page
  div.flow
    BaseGhostLogo.mt-md.center-align
    p Login and find an available Moodscout and/or Ghostwriter within seconds. No more chain calling your handwritten, out-of-date list of Ghosts.
  form
    fieldset.flow
      BaseInput(type="email" id="email" name="email" v-model="email" placeholder="Email" label="Email")
      BaseInput(type="password" id="password" name="password" v-model="password" placeholder="Password" label="Password")
    BaseButton.mt-xxl LOG IN
    p.mt-md.center-align No account yet? Register to get started right away and get 30 days for free.
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
}
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: flex-start;
  height: 100vh;
}

form {
  display: flex;
  flex-direction: column;
}
</style>
