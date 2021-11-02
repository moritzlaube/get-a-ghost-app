<template lang="pug">
  div
    label.sr-only
    .input-wrapper
      input(@focus="showOptions=true" @blur="showOptions=false")
      transition(name="fade")
        ul.options(v-show="showOptions")
          li(v-for="(option, i) in countryCodes" :key="i") {{ option }}
</template>

<script>
export default {
  name: 'SearchSelect',
  data: () => ({
    showOptions: false,
    countryCodes: [
      'Option1',
      'Option2',
      'Option3',
      'Option4',
      'OPtion5',
      'Option6',
      'OPtion7',
      'Option9',
      'Option10',
      'Option11',
      'Option11',
    ],
  }),
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
