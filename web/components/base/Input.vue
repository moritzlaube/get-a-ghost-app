<template lang="pug">
  div
    label.sr-only(:for="id") {{ label }}
    input(v-bind="$attrs" :id="id" :value="value" @input="$emit('input', $event.target.value)")
</template>

<script>
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: 'Label',
    },
    value: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
input {
  background-color: var(--bg-dark-grey);
  box-shadow: inset 5px 5px 12px var(--shadow-dark),
    inset -5px -5px 12px var(--shadow-light);
  border-radius: 5px;
  border: none;
  width: 100%;
  padding: var(--space-sm) var(--space-md);
}

input::placeholder {
  color: #c4c4c4;
}
</style>
