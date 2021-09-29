<template lang="pug">
  div
    label.sr-only(:for="id") {{ label }}
    div.select(:tabindex="tabindex" :placeholder="placeholder" @blur="open = false" @click="open = !open" :id="id")
      div.flex
        div.select__selected(:class="{ 'select--open': open }") {{ selected_option ? selected_option : placeholder }}
        <svg width="10" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.8.8 5 4.8 1.2.8 0 2l5 5.2L10 2 8.8.8Z" fill="#C4C4C4"/></svg>
      div.options(:class="{ 'select--hide': !open }")
        div(v-for="(option, i) in options" :key="i" @click="selected_option = option; $emit('input', option)") {{ option }}
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
      type: String,
      default: '0',
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
  width: 100%;
  box-shadow: 5px 5px 12px var(--shadow-dark),
    -5px -5px 12px var(--shadow-light);
  border-radius: 10px;
  border: 1px solid red;
  background-repeat: no-repeat;
  background-position: right var(--space-sm) top 50%;
  cursor: pointer;
  color: var(--text-mid-grey);
}

.select__selected {
  padding: var(--space-xs);

  & + svg {
    display: block;
    margin: var(--space-xs);
  }
}

.select .options {
  background-color: var(--bg-dark-grey);
  border-radius: 10px;
  max-height: 500px;
}

.select .options > * {
  padding: 0.25rem var(--space-xs);
}

.select .options.select--hide {
  max-height: 0;
  overflow: hidden;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
