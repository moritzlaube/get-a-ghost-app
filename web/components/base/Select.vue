<template lang="pug">
    div
        label.sr-only(:for="id") {{ label }}
        div.select
            select(:id="id")
                slot
</template>

<script>
export default {
  name: 'BaseSelect',
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
// Reset select element
select {
  // A reset of styles, including removing the default dropdown arrow
  appearance: none;
  // Additional resets for further consistency
  border: none;
  background-color: transparent;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  color: inherit;
}

select::-ms-expand {
  display: none;
}

select:focus {
  outline: none;
}

// style select element
.select {
  display: flex;
  width: 100%;
  box-shadow: 5px 5px 12px var(--shadow-dark),
    -5px -5px 12px var(--shadow-light);
  border-radius: 10px;
  padding: var(--space-xs) 35px var(--space-xs) var(--space-sm);
  background-image: url('@/assets/images/arrow-down.svg');
  background-repeat: no-repeat;
  background-position: right var(--space-sm) top 50%;
  cursor: pointer;
  color: var(--text-mid-grey);
}
</style>
