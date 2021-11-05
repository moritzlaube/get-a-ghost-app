<template lang="pug">
div.container.login-page
  div.flow
    BaseGhostLogo.mt-md.center-align
    h1 Login
    p Login and find an available Moodscout and/or Ghostwriter within seconds. No more chain calling your handwritten, out-of-date list of Ghosts.
  div.flow
    transition(name="slide" mode="out-in")
      form(v-if="resetPassword" key="login" @submit.prevent="reset" :class="{ loading: isLoading }")
        fieldset.flow
          BaseInput(type="email" id="email" name="email" v-model="email" placeholder="Email" label="Email" required)
        BaseButton(:disabled="!email").mt-xxl.has-shadow RESET PASSWORD
      form(v-else key="reset" @submit.prevent="login" :class="{ loading: isLoading }")
        fieldset.flow.split
          BaseInput(type="email" id="email" name="email" v-model="email" placeholder="Email" label="Email" required)
          BaseInput(type="password" id="password" name="password" v-model="password" placeholder="Password" label="Password" required)
        p.error.center-align.mt-sm(v-if="error === 401") Wrong email or password. Please try again.
        BaseButton(:disabled="!(email && password)").mt-xxl.has-shadow LOG IN
        //- p.mt-md.center-align Forgot your password? Go and #[span(@click="resetPassword = true").reset reset] it.
        p.mt-md.center-align No account yet? #[NuxtLink(to="/register") Register] to get started right away.
    BaseFooter
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
      } catch (errors) {
        const errorResponse = this.$errorHandler.setAndParse(errors)
        if (errorResponse.status === 401) {
          this.error = 401
        } else {
          this.$notify({
            type: 'error',
            title: 'Error: ' + errorResponse.status,
            text: errorResponse.message,
            duration: 5000,
          })
        }
      } finally {
        this.isLoading = false
      }
    },
    async reset() {},
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

@media screen and (min-width: 32rem) {
  .login-page {
    justify-content: start;
  }
}

form {
  display: flex;
  flex-direction: column;
}

.reset {
  color: var(--clr-pink);
  text-decoration: underline;
  cursor: pointer;
}

.error {
  color: var(--clr-pink);
}

.slide-enter {
  opacity: 0;
  transform: translateX(100px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease-in-out;
}
</style>
