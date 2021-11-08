<template lang="pug">
div.container.register-page
  div.flow
    BaseGhostLogo.mt-md.center-align
    h1 Register
    p(v-if="currentStep === 1") Register and find an available Moodscout and/or Ghostwriter within seconds. No more chain calling your handwritten, out-of-date list of Ghosts.
    p(v-if="currentStep === 2") Please let us know your name, company (if applicable) and phone. Your phone will come in handy when your requested Ghost needs to get in contact with you.
  div.flow
    transition(name="slide" mode="out-in")   
      FormRegisterEmailAndPassword(v-if="currentStep === 1" @update="processStep" @next="currentStep++")
      div(v-if="currentStep === 2")
        BaseBackButton(@click="currentStep--; error=null") Go Back
        FormRegisterNameAndCompany(@update="processStep" @sendForm="registerUser" :class="{ loading: isLoading }")
           p.error.center-align.mt-sm(v-if="error === 409") This user already exists. Please use a different email address.
      div(v-if="currentStep === 3")
        p.mt-md 
          | We have sent you an email with a verification code that you can copy and paste. Please also check your spam.
          br
          | You can #[NuxtLink(to="/") skip] this step for now and start your search immediately.
        FormVerifyPIN.mt-xxl(@update="processStep" @verify-pin="verifyPin" :class="{ loading: isLoading }")
  BaseFooter
</template>

<script>
export default {
  name: 'RegisterPage',
  auth: false,
  layout: 'onboarding',
  middleware({ store, redirect }) {
    // If the user is authenticated
    if (store.state.auth.user) {
      return redirect('/')
    }
  },
  data() {
    return {
      form: {},
      response: '',
      isLoading: false,
      currentStep: 1,
      error: null,
    }
  },

  methods: {
    processStep(stepData) {
      Object.assign(this.form, stepData)
    },
    async registerUser() {
      this.isLoading = true

      try {
        const { data } = await this.$axios.post('auth/register', {
          ...this.form,
        })

        this.response = data.data

        await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password,
          },
        })

        this.currentStep++
      } catch (errors) {
        const errorResponse = this.$errorHandler.setAndParse(errors)

        if (errorResponse.status === 409) {
          this.error = errorResponse.status
          return
        }

        this.$notify({
          type: 'error',
          title: 'Error: ' + errorResponse.status,
          text: errorResponse.message,
          duration: 5000,
        })
      } finally {
        this.isLoading = false
      }
    },
    async verifyPin() {
      this.isLoading = true

      try {
        const { data } = await this.$axios.post('auth/verify', {
          pin: this.form.code,
        })

        this.response = data.data
      } catch (err) {
        this.response = err.response.data
      }

      this.isLoading = false

      // refetch user to get email verification status
      await this.$auth.fetchUser()

      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.register-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

.error {
  color: var(--clr-pink);
}

@media screen and (min-width: 32rem) {
  .register-page {
    justify-content: start;
  }
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
