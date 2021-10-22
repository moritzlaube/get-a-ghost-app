<template lang="pug">
  div.container
    BaseGhostLogo.mt-md.center-align
    div(v-if="$fetchState.pending")
      BaseGhostIcon.centered
      p.center-align.mt-md Loading ...
    p.mt-md(v-else-if="error") {{error.message}}
    div.mt-md.flow(v-else)
      div
        p Welcome on board {{form.firstName}}!
        p We are happy to have you. Please fill out this form to create your account. On the following page you'll be able to complete your details.
      form.flow(@submit.prevent="handleSubmit" :class="{ loading: isLoading }")
        div
          span.label Email
          div.email {{form.email}}
        div
          span.label Password
          BaseInput(type="password" id="password" name="password" v-model="form.password" placeholder="Password" label="Password" required)
        div.split
          div
            span.label First Name
            BaseInput(type="text" id="firstName" name="firstName" v-model="form.firstName" placeholder="First Name" label="First Name" required)
          div
            span.label Last Name
            BaseInput(type="text" id="lastName" name="lastName" v-model="form.lastName" placeholder="Last Name" label="Last Name" required)
        div
          span.label Your public alias
          BaseInput(type="text" id="ghostName" name="ghostName" v-model="form.ghostName" :placeholder="form.firstName + ' ' + form.lastName" label="Ghost Name")
        div
          span.label Phone
          BaseInput(type="tel" id="phone" name="phone" v-model="form.phone" placeholder="+491511234567" label="Phone" required)
        BaseButton(:disabled="!(this.form.phone && this.form.password)" type="submit") Create Account
</template>

<script>
export default {
  name: 'VerifyAndOnboard',
  auth: false,
  layout: 'onboarding',
  data() {
    return {
      isLoading: false,
      form: {
        email: 'Email',
        firstName: 'First Name',
        lastName: 'Last Name',
      },
      error: null,
    }
  },
  async fetch() {
    const { token } = this.$route.query
    try {
      const { data } = await this.$axios.$get(`/auth/invite/${token}`)
      this.form = data
    } catch (error) {
      // throw Error
      this.error = {
        message: error.response.data.message,
        status: error.response.status,
      }
      // if (this.error.status === 404)
      //   this.$nuxt.error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.isLoading = true

        await this.$axios.post('/ghosts', {
          email: this.form.email,
          password: this.form.password,
          name: {
            first: this.form.firstName,
            last: this.form.lastName,
          },
          phone: this.form.phone,
        })

        await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password,
          },
        })

        this.isLoading = false
        this.$router.push('/profile')
      } catch (error) {
        this.isLoading = false

        this.error = {
          message: error.response.data.message,
          status: error.response.status,
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.email {
  color: #9c9c9c;
}
</style>
