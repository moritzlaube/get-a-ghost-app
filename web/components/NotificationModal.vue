<template lang="pug">
  div.modal
    div.modal__content.container
      BaseGhostIcon
      h2
        slot(name="heading")
      p
        slot(name="content")
</template>

<script>
export default {
  name: 'NotificationModal',
  methods: {},
}
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal__content p span {
  color: var(--clr-pink);
}
</style>
