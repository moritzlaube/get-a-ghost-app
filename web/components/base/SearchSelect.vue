<template lang="pug">
  div
    .input-wrapper
      label.sr-only(:for="id")
      input(@focus="openDropdown" @blur="showOptions=false" :value="selected" @input="handleInput" :id="id" v-bind="$attrs")
      transition(name="fade")
        ul.options(v-show="showOptions" @click="handleSelect" ref="options")
          li(v-for="(option, i) in filteredOptions" :key="i" :class="{ selected: option === selected }") {{ option }}
</template>

<script>
export default {
  name: 'SearchSelect',
  props: {
    id: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    preSelected: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    showOptions: false,
    selected: null,
    filteredOptions: null,
    selectedElement: null,
  }),
  created() {
    this.filteredOptions = this.options

    if (!this.selected) {
      this.selected = this.preSelected
    }
  },
  methods: {
    openDropdown() {
      // const dropdown = this.$refs.options
      // dropdown.style.opacity = 0
      // dropdown.style.display = 'block'

      // this.selectedElement = dropdown.querySelector('.selected').scrollTop

      // dropdown.style.opacity = ''
      // dropdown.style.display = 'none'

      this.showOptions = true
    },
    handleSelect(e) {
      this.selected = e.target.innerHTML
      this.$emit('input', this.selected)
    },
    handleInput(e) {
      this.selected = e.target.value
      this.filteredOptions = this.options.filter((o) =>
        o.toLowerCase().includes(e.target.value.toLowerCase())
      )
      this.$emit('input', this.selected)
    },
  },
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;
}

input {
  background-color: var(--bg-dark-grey);
  box-shadow: var(--box-shadow);
  border-radius: 5px;
  border: none;
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  color: var(--text-light);
}

input::placeholder,
input:disabled {
  color: #9c9c9c;
}

.options {
  position: absolute;
  margin-top: 0.5rem;
  width: 100%;
  max-height: 8rem;
  overflow: scroll;
  background-color: var(--bg-dark-grey);
  box-shadow: 5px 5px 12px var(--shadow-dark),
    -5px -5px 12px var(--shadow-light);
  border-radius: 10px;
  border: 1px solid var(--mid-grey);
  cursor: pointer;
  color: var(--text-mid-grey);
  z-index: 99;
}

.options > * {
  padding: 0.25rem var(--space-xs);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.options > *:hover,
.options > .selected {
  background-color: var(--mid-grey);
}

.fade-enter-active,
.fade-leave-active {
  transition: transform 0.25s ease-in-out, opacity 0.25s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
