<template lang="pug">
div.container.register-page
  div.flow
    BaseGhostLogo.mt-md.center-align
    p Login and find an available Moodscout and/or Ghostwriter within seconds. No more chain calling your handwritten, out-of-date list of Ghosts.
  form(@submit.prevent="userLogin")
    fieldset.flow
      BaseInput(type="text" id="fname" name="fname" v-model="register.name.first" placeholder="First Name" label="First Name")
      BaseInput(type="text" id="lname" name="lname" v-model="register.name.last" placeholder="Last Name" label="Last Name")
      BaseInput(type="text" id="company" name="company" v-model="register.company" placeholder="Company (optional)" label="Company")
      BaseInput(type="email" id="email" name="email" v-model="register.email" placeholder="Email" label="Email")
      BaseInput(type="password" id="password" name="password" v-model="register.password" placeholder="Password" label="Password")
    BaseButton.mt-xxl REGISTER
    p.mt-md.center-align You already have an account? #[NuxtLink(to="/login") Login] instead.
</template>

<script>
export default {
  name: 'RegisterPage',
  middleware: 'guest',
  auth: false,
  data() {
    return {
      register: {
        name: {
          first: '',
          last: '',
        },
        company: '',
        email: '',
        password: '',
      },
      error: '',
      response: '',
    }
  },
  methods: {
    async userLogin() {
      try {
        const { data } = await this.$axios.post('auth/register', {
          ...this.register,
        })

        this.response = data.data

        await this.$auth.loginWith('local', {
          data: {
            email: this.register.email,
            password: this.register.password,
          },
        })

        // this.$router.push('/')
      } catch (err) {
        this.error = err.response.data
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.register-page {
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
