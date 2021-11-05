<template lang="pug">
  div.flow
    div.vue-pincode-wrapper
        PincodeInput(v-model="code" placeholder="·" @input="onFormInput")
    p No verificytion code? Just click the 
      button.btn(type="button" @click="sendVerificationCode") link
      | &nbsp;and have a new PIN sent to you.
    BaseButton(type="button" @click="onSubmit").has-shadow VERIFY
</template>

<script>
export default {
  name: 'FormVerifyPIN',
  data() {
    return {
      code: '',
    }
  },
  methods: {
    async sendVerificationCode() {
      try {
        await this.$axios.$get('/auth/resend-token')
        this.$notify({
          type: 'success',
          title: "We've sent you an email",
          text: 'We just have sent you an email with your new pin. Please also check your spam.',
          duration: 5000,
        })
      } catch (errors) {
        const errorResponse = this.$errorHandler.setAndParse(errors)
        this.$notify({
          type: 'error',
          title: 'Error: ' + errorResponse.status,
          text: errorResponse.message,
          duration: 5000,
        })
      }
    },
    onFormInput() {
      this.$emit('update', {
        code: this.code,
      })
    },
    onSubmit() {
      this.$emit('verify-pin')
    },
  },
}
</script>

<style lang="scss">
div.vue-pincode-input-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

input.vue-pincode-input {
  max-width: 20%;
  padding: var(--space-sm);
  background-color: var(--bg-dark-grey);
  box-shadow: inset 5px 5px 12px var(--shadow-dark),
    inset -5px -5px 12px var(--shadow-light);
  border-radius: 5px;
  border: none;
  color: var(--text-light);
}

.btn {
  color: var(--clr-pink);
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  margin: 0;
  border: 0;
  background-color: transparent;
}
</style>
