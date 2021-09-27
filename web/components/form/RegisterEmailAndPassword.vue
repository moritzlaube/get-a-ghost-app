<template lang="pug">
  form(@input="onFormInput")
    fieldset.flow
      BaseInput(type="email" id="email" name="email" v-model="form.email" placeholder="Email" label="Email")
      BaseInput(type="password" id="password" name="password" v-model="form.password" placeholder="Password" label="Password")
    BaseButton(type="button" @click="nextStep").mt-xxl NEXT
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
