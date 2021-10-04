<template lang="pug">
div.container.register-page
  div.flow
    BaseGhostLogo.mt-md.center-align
    p(v-if="currentStep === 1") Register and find an available Moodscout and/or Ghostwriter within seconds. No more chain calling your handwritten, out-of-date list of Ghosts.
    p(v-if="currentStep === 2") Please let us know your name, company (if applicable) and phone. Your phone will come in handy when your requested Ghost needs to get in contact with you.
  div   
    FormRegisterEmailAndPassword(v-if="currentStep === 1" @update="processStep" @next="currentStep++")
    FormRegisterNameAndCompany(v-if="currentStep === 2" @update="processStep" @sendForm="registerUser" :class="{ loading: isLoading }")
    FormVerifyPIN(v-if="currentStep === 3" @update="processStep" @verify-pin="verifyPin" :class="{ loading: isLoading }")
    p.mt-md.center-align(v-if="currentStep === 1") You already have an account? #[NuxtLink(to="/login") Login] instead.
</template>

<script>
export default {
  name: 'RegisterPage',
  auth: false,
  layout: 'onboarding',
  data() {
    return {
      form: {},
      response: '',
      isLoading: false,
      currentStep: 1,
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
      } catch (err) {
        this.response = err.response.data
      }

      this.isLoading = false
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
</style>
