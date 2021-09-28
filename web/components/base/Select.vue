<template lang="pug">
  div
    label.sr-only(:for="id") {{ label }}
    div.select(:tabindex="tabindex" :placeholder="placeholder" @blur="open = false" @click="open = !open" :id="id")
      div.select__selected(:class="{ 'select--open': open }") {{ selected_option ? selected_option : placeholder }}
      div.options(:class="{ 'select--hide': !open }")
        div(v-for="(option, i) in options" :key="i" @click="selected_option = option; open = false; $emit('input', option)") {{ option }}
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    label: {
      type: String,
      default: 'Label',
    },
    placeholder: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    tabindex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      open: false,
      selected_option: null,
    }
  },
}
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  width: 100%;
  box-shadow: 5px 5px 12px var(--shadow-dark),
    -5px -5px 12px var(--shadow-light);
  border-radius: 10px;
  border: 1px solid red;
  padding: var(--space-xs) 35px var(--space-xs) var(--space-sm);
  background-image: url('@/assets/images/arrow-down.svg');
  background-repeat: no-repeat;
  background-position: right var(--space-sm) top 50%;
  cursor: pointer;
  color: var(--text-mid-grey);
}

.select .options {
  background-color: var(--bg-dark-grey);
  border-radius: 10px;
  padding: var(--space-xs) 35px var(--space-xs) var(--space-sm);
}

.select--hide {
  display: none;
}
</style>
