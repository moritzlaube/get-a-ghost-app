<template lang="pug">
  button(v-bind="$attrs" v-on="$listeners")
    span
      slot
    .spinner 
      .bounce1 
      .bounce2 
      .bounce3
</template>

<script>
export default {
  name: 'BaseButton',
  inheritAttrs: false,
}
</script>

<style lang="scss" scoped>
button {
  position: relative;
  background-color: var(--clr-pink);
  color: black;
  border-radius: 5px;
  border: none;
  width: 100%;
  padding: 10px var(--space-md);
  cursor: pointer;
  height: min-content;
}

button span {
  line-height: 1;
}

button.has-shadow {
  box-shadow: 5px 5px 12px var(--shadow-dark),
    -5px -5px 12px var(--shadow-light);
}

.loading button span {
  visibility: hidden;
  opacity: 0;
}

.spinner {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.loading button .spinner {
  visibility: visible;
  opacity: 1;
}

.spinner > div {
  width: 0.75rem;
  height: 0.75rem;
  background-color: black;
  border-radius: 100%;
  display: inline-block;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner > div + div {
  margin-left: 0.2rem;
}

.spinner .bounce1 {
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  animation-delay: -0.16s;
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
