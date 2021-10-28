<template lang="pug">
  div.container
    BaseBackButton(@click="$router.go(-1)") Go back
    div.flow.mt-xxl
      h1 Verify your email
      client-only
        FormVerifyPIN(@verify-pin="verifyPin" @update="updatePin" :class="{ loading: isLoading }")
</template>

<script>
export default {
  name: 'VerifyEmailPage',
  data() {
    return {
      isLoading: false,
      code: null,
    }
  },
  methods: {
    updatePin(pin) {
      this.code = pin.code
    },
    async verifyPin() {
      this.isLoading = true

      try {
        await this.$axios.post('auth/verify', {
          pin: this.code,
        })

        // refetch user to get email verification status
        await this.$auth.fetchUser()

        this.$notify({
          type: 'success',
          title: 'Email verified',
          text: 'You successfully verified your email address.',
          duration: 5000,
        })

        this.$router.push('/')
      } catch (errors) {
        const errorResponse = this.$errorHandler.setAndParse(errors)

        this.$notify({
          type: 'error',
          title: 'Error:' + errorResponse.status,
          text: errorResponse.message,
          duration: 5000,
        })
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
