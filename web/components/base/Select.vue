<template lang="pug">
  div
    label.sr-only(:for="id") {{ label }}
    .select(ref="select" :tabindex="tabindex" :placeholder="placeholder" :class="{ 'select--open': open }" @blur="open = false" @click="open = !open" :id="id")
      .flex
        .select__selected {{ selected_option ? selected_option : placeholder }}
        dv.arrow(:class="{ open: open }")
          <svg width="10" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.8.8 5 4.8 1.2.8 0 2l5 5.2L10 2 8.8.8Z" fill="#C4C4C4"/></svg>
      transition(name="expand" @before-enter="beforeEnter" @enter="enter" @leave="leave")
        .options(v-if="open")
          div(v-for="(option, i) in options" :key="i" :class="{ selected: option === selected_option }" @click="selected_option = option; $emit('input', {[id]: option})") {{ option }}
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
      collapsedElementHeight: null,
    }
  },
  methods: {
    beforeEnter(el) {
      this.$refs.select.style.height = this.$refs.select.offsetHeight + 'px'
      this.element = this.$refs.select.offsetHeight
    },
    enter(el) {
      this.$refs.select.style.height = this.$refs.select.scrollHeight + 'px'
    },
    leave(el) {
      this.$refs.select.style.height = this.element + 'px'
    },
  },
}
</script>

<style lang="scss" scoped>
.select {
  width: 100%;
  box-shadow: 5px 5px 12px var(--shadow-dark),
    -5px -5px 12px var(--shadow-light);
  border-radius: 10px;
  border: 1px solid var(--mid-grey);
  background-repeat: no-repeat;
  background-position: right var(--space-sm) top 50%;
  cursor: pointer;
  color: var(--text-mid-grey);
  overflow: hidden;
  will-change: height;
  transition: height 0.25s ease-out;
}

.select__selected {
  padding: var(--space-xs);

  & + .arrow {
    display: block;
    margin: var(--space-xs);
    transition: transform 0.25s ease-in-out;
  }

  & + .arrow.open {
    transform: rotate(180deg);
  }
}

.select .options {
  background-color: var(--bg-dark-grey);
}

.select .options > * {
  padding: 0.25rem var(--space-xs);
}

.select .options > *:hover,
.select .options > .selected {
  background-color: var(--mid-grey);
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.expand-enter-active,
.expand-leave-active {
  transition: opacity 0.25s;
}

.expand-enter,
.expand-leave-to {
  opacity: 0;
}
</style>
