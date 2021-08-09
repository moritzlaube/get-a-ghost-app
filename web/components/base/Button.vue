<template lang="pug">
  button(type="submit")
    slot
</template>

<script>
export default {
  name: 'BaseButton',
}
</script>

<style lang="scss" scoped>
button {
  background-color: var(--clr-pink);
  color: black;
  box-shadow: 5px 5px 12px var(--shadow-dark),
    -5px -5px 12px var(--shadow-light);
  border-radius: 5px;
  border: none;
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  line-height: 1;
}
</style>
