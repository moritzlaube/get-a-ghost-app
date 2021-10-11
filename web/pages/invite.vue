<template lang="pug">
  div.container
    p(v-if="$fetchState.pending") Loading ...
    p(v-else-if="error") {{error.message}}
    p(v-else) {{email}}
</template>

<script>
export default {
  name: 'VerifyAndOnboard',
  auth: false,
  data() {
    return {
      email: null,
      error: null,
    }
  },
  async fetch() {
    const { token } = this.$route.query
    try {
      const { data } = await this.$axios.$get(`/auth/invite/${token}`)
      this.email = data
    } catch (error) {
      this.error = {
        message: error.response.data.message,
        status: error.response.status,
      }
    }
  },
}
</script>
