<template lang="pug">
  form(@input="onFormInput")
    fieldset.split.flow
      BaseInput(type="email" id="email" name="email" v-model="form.email" placeholder="Email" label="Email" required)
      BaseInput(type="password" id="password" name="password" v-model="form.password" placeholder="Password" label="Password" required)
    p.mt-md.center-align You already have an account? #[NuxtLink(to="/login") Login] instead.
    BaseButton(type="button" @click="nextStep" :disabled="!(form.email && form.password)").mt-xl.has-shadow NEXT
</template>

<script>
export default {
  name: 'FormRegisterEmailAndPassword',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    nextStep() {
      this.$emit('next')
    },
    onFormInput() {
      this.$emit('update', {
        email: this.form.email,
        password: this.form.password,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
