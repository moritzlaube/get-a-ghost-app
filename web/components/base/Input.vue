<template lang="pug">
  div.input-container
    label.sr-only(:for="id") {{ label }}
    i(v-if="icon")
      slot(name="icon")
    input(v-bind="$attrs" :id="id" :value="value" v-on="customListeners" :class="{ 'input--icon': icon }")
</template>

<script>
export default {
  name: 'BaseInput',
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
    icon: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    customListeners() {
      return {
        ...this.$listeners,
        input: (e) => {
          this.$emit('input', e.target.value)
        },
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.input-container {
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

.input--icon {
  padding-left: 36px;
}

.input-container i {
  display: flex;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  width: 16px;
  color: var(--text-light);
}

input::placeholder,
input:disabled {
  color: #9c9c9c;
}

input:disabled {
  cursor: not-allowed;
}

input input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  box-shadow: inset 5px 5px 12px var(--shadow-dark);
  -webkit-box-shadow: 0 0 1000px var(--bg-dark-grey) inset;
  -webkit-text-fill-color: var(--text-light);
}
</style>
