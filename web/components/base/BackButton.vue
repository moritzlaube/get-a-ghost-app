<template lang="pug">
  button.btn(v-bind="$attrs" v-on="$listeners")
    svg(width="10" height="8" fill="none" xmlns="http://www.w3.org/2000/svg")
      path(d="M8.8.8 5 4.8 1.2.8 0 2l5 5.2L10 2 8.8.8Z" fill="#C4C4C4")
    slot
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
  background-color: var(--bg-dark-grey);
  box-shadow: 5px 5px 12px var(--shadow-dark),
    -5px -5px 12px var(--shadow-light);
  border-radius: 10px;
  border: 1px solid var(--mid-grey);
  padding: var(--space-xs) var(--space-md);
  color: var(--text-mid-grey);
  line-height: 1;
  cursor: pointer;
}

svg {
  transform: rotate(90deg);
  margin-right: 0.5rem;
}
</style>
