<template lang="pug">
div.container.login-page
  div.flow
    BaseGhostLogo.mt-md.center-align
    p Login and find an available Moodscout and/or Ghostwriter within seconds. No more chain calling your handwritten, out-of-date list of Ghosts.
    p(v-if="error") {{error}}
  form(@submit.prevent="login" :class="{ loading: isLoading }")
    fieldset.flow
      BaseInput(type="email" id="email" name="email" v-model="email" placeholder="Email" label="Email")
      BaseInput(type="password" id="password" name="password" v-model="password" placeholder="Password" label="Password")
    BaseButton(:disabled="!(email && password)").mt-xxl.has-shadow LOG IN
    p.mt-md.center-align Forgot your password? Go and reset.
    p.mt-md.center-align No account yet? #[NuxtLink(to="/register") Register] to get started right away.
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'onboarding',
  data() {
    return {
      email: '',
      password: '',
      resetPassword: false,
      isLoading: false,
      response: null,
      error: null,
    }
  },
  methods: {
    async login() {
      this.isLoading = true

      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
      } catch (error) {
        this.error = error.response.data
      }

      this.isLoading = false
    },
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
