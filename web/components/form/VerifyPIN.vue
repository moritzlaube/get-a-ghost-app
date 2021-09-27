<template lang="pug">
  div.flow
    div.vue-pincode-wrapper
        PincodeInput(v-model="code" placeholder="·" @input="onFormInput")
    BaseButton(type="button" @click="onSubmit") VERIFY
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
</style>
