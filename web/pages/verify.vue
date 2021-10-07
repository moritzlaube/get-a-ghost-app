<template lang="pug">
  div.container
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
        const { data } = await this.$axios.post('auth/verify', {
          pin: this.code,
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
