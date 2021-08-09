<template lang="pug">
div.container.register-page
  div.flow
    BaseGhostLogo.mt-md.center-align
    p Login and find an available Moodscout and/or Ghostwriter within seconds. No more chain calling your handwritten, out-of-date list of Ghosts.
  form
    fieldset.flow
      BaseInput(type="text" id="fname" name="fname" v-model="firstName" placeholder="First Name" label="First Name")
      BaseInput(type="text" id="lname" name="lname" v-model="lastName" placeholder="Last Name" label="Last Name")
      BaseInput(type="text" id="company" name="company" v-model="company" placeholder="Company (optional)" label="Company")
      BaseInput(type="email" id="email" name="email" v-model="email" placeholder="Email" label="Email")
      BaseInput(type="password" id="password" name="password" v-model="password" placeholder="Password" label="Password")
    BaseButton.mt-xxl REGISTER
    p.mt-md.center-align You already have an account? #[NuxtLink(to="/login") Login] instead.
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
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
