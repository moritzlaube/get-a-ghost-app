<template lang="pug">
  div.flex
    label.checkbox(:for="id")
      input(type="checkbox" :id="id" :name="id" @change="$emit('input', $event.target.checked)" :checked="value")
    span Yes, I'd like to send my phone number to anyone who wants to request me!
</template>

<script>
export default {
  name: 'Checkbox',
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
}

.flex > * + * {
  margin-left: 1rem;
}

.flex span {
  font-size: var(--text-sm);
}

input[type='checkbox'] {
  appearance: none;
  background-color: var(--bg-dark-grey);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--mid-grey);
  box-shadow: 5px 5px 12px var(--shadow-dark),
    -5px -5px 12px var(--shadow-light);
}

input[type='checkbox']::before {
  content: '';
  border-radius: 50%;
  width: 16px;
  height: 16px;
  background-color: var(--clr-pink);
  transform: scale(0);
  transition: 0.2s transform cubic-bezier(1, 0.68, 0.52, 1.38);
}

input[type='checkbox']:checked::before {
  transform: scale(1);
}
</style>
