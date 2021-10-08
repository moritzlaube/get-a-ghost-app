<template lang="pug">
  div.container
    p Hi! {{error}}
</template>

<script>
export default {
  name: 'VerifyAndOnboard',
  auth: false,
  async asyncData({ query, $axios }) {
    const { token } = query
    let response
    try {
      response = await $axios.get(`/auth/invite/${token}`)
    } catch (error) {
      return {
        error,
      }
    }

    return {
      email: response.data.email,
    }
  },
  data() {
    return {
      error: null,
      response: null,
    }
  },
  // async fetch() {
  //   const { token } = this.$route.query
  //   email = await this.$axios.$get(`/auth/invite/${token}`)
  // },
  // fetchOnServer: false,
}
</script>
