<template lang="pug">
  div.container
    BaseGhostLogo.mt-md.center-align
    div.mt-md.flow
      h1 Welcome on board, {{form.firstName}}!
      p We are happy to have you. Please fill out this form to create your account. On the following page you'll be able to complete your profile. As soon as you're done, you'll be immediately discoverable by everyone who is in need of your excellency.
      form.flow.mt-xl(@submit.prevent="handleSubmit" :class="{ loading: isLoading }")
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
          div.split
            BaseSearchSelect.country-code(type="tel" id="country-code" v-model="form.countryCode" :options="Array.from(countryCodes)" pre-selected="+49" required)
            BaseInput(type="tel" id="phone" name="phone" v-model="form.phone" placeholder="1511234567" label="Phone" required)
        BaseButton(:disabled="!(this.form.phone && this.form.password)" type="submit") Create Account
    BaseFooter
</template>

<script>
import countryCodes from '@/assets/json/country-codes.json'

export default {
  name: 'VerifyAndOnboard',
  auth: false,
  layout: 'onboarding',
  middleware({ redirect, route, error }) {
    if (!Object.prototype.hasOwnProperty.call(route.query, 'token'))
      redirect('/')
  },
  async asyncData({ route, redirect, $axios, $errorHandler, $notify }) {
    const { token } = route.query
    try {
      const { data } = await $axios.$get(`/auth/invite/${token}`)
      return {
        form: {
          ...data,
        },
      }
    } catch (errors) {
      const errorResponse = $errorHandler.setAndParse(errors)

      if (errorResponse.status === 404) redirect('/')

      $notify({
        type: 'error',
        title: 'Error:' + errorResponse.status,
        text: errorResponse.message,
        duration: 5000,
      })
    }
  },
  data() {
    return {
      isLoading: false,
      accountCreated: false,
      form: {
        email: 'Email',
        firstName: 'First Name',
        lastName: 'Last Name',
        ghostName: null,
        password: null,
        countryCode: '+49',
        phone: null,
      },
    }
  },
  computed: {
    countryCodes() {
      return new Set(countryCodes.map((code) => code.dial_code))
    },
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
          countryCode: this.form.countryCode,
        })

        await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password,
          },
        })

        this.isLoading = false
        this.$router.push('/profile')
      } catch (errors) {
        this.isLoading = false
        const errorResponse = this.$errorHandler.setAndParse(errors)

        this.$notify({
          type: 'error',
          title: 'Error:' + errorResponse.status,
          text: errorResponse.message,
          duration: 5000,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.email {
  color: #9c9c9c;
}

.country-code {
  flex-basis: 30%;
}
</style>
