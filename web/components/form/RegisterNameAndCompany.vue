<template lang="pug">
  form(@input="onFormInput" @submit.prevent="onSubmit")
    fieldset.flow
      BaseInput(type="text" id="fname" name="fname" v-model="form.name.first" placeholder="First Name" label="First Name")
      BaseInput(type="text" id="lname" name="lname" v-model="form.name.last" placeholder="Last Name" label="Last Name")
      BaseInput(type="text" id="company" name="company" v-model="form.company" placeholder="Company (optional)" label="Company")
      BaseInput(type="tel" id="phone" name="phone" v-model="form.phone" placeholder="+491511234567" label="Phone")
    BaseButton(type="submit").mt-xxl REGISTER
</template>

<script>
export default {
  name: 'FormRegisterNameAndCompany',
  data() {
    return {
      form: {
        name: {
          first: '',
          last: '',
        },
        company: '',
        phone: '',
      },
    }
  },
  methods: {
    onFormInput() {
      this.$emit('update', {
        name: this.form.name,
        company: this.form.company,
        phone: this.form.phone,
      })
    },
    onSubmit() {
      this.$emit('sendForm')
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
