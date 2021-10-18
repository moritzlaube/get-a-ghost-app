<template lang="pug">
  div
    label(:for="id")
    textarea(v-bind="$attrs" @input="$emit('input', $event.target.value)" :id="id") {{value}}
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
textarea {
  background-color: var(--bg-dark-grey);
  box-shadow: var(--box-shadow);
  border-radius: 5px;
  border: none;
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  color: var(--text-light);
  resize: vertical;
}

textarea::placeholder,
textarea:disabled {
  color: #9c9c9c;
}
</style>
