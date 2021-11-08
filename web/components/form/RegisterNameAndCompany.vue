<template lang="pug">
  form(@input="onFormInput" @submit.prevent="onSubmit")
    fieldset.flow.mt-md
      div.flow.split
        div
          span.label First Name
          BaseInput(type="text" id="fname" name="fname" v-model="form.name.first" placeholder="First Name" label="First Name" required)
        div
          span.label Last Name
          BaseInput(type="text" id="lname" name="lname" v-model="form.name.last" placeholder="Last Name" label="Last Name" required)
      div
        span.label Company
        BaseInput(type="text" id="company" name="company" v-model="form.company" placeholder="Company (optional)" label="Company")
      div
        span.label Phone
        .phone-split
          BaseSearchSelect(type="tel" id="country-code" v-model="form.countryCode" :options="Array.from(countryCodes)" :pre-selected="'+49'" required)
          BaseInput(type="tel" id="phone" name="phone" v-model="form.phone" placeholder="1511234567" label="Phone" required)
      slot
    BaseButton(type="submit" :disabled="!(form.name.first && form.name.last && form.phone)").mt-xxl.has-shadow REGISTER
    p.mt-sm.small-text By registering, I agree to your &#32;
      NuxtLink(to="/terms-and-conditions") terms &amp; conditions
      | &#32; and &#32;
      NuxtLink(to="/privacy") privacy policy
      | .
</template>

<script>
import countryCodes from '@/assets/json/country-codes.json'

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
        countryCode: '',
        phone: '',
      },
    }
  },
  computed: {
    countryCodes() {
      return new Set(countryCodes.map((code) => code.dial_code))
    },
  },
  methods: {
    onFormInput() {
      this.$emit('update', {
        name: this.form.name,
        company: this.form.company,
        countryCode: this.form.countryCode,
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
