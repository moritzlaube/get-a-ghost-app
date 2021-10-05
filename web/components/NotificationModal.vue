<template lang="pug">
  transition(name="modal")
    .modal(v-if="open")
      transition(name="content" appear)
        div(v-if="open").modal__content.mt-xxxl.container.flow
          BaseGhostIcon
          h2
            slot(name="heading")
          .body.flow
            slot(name="content") 
          .btn
            slot(name="button")
</template>

<script>
export default {
  name: 'NotificationModal',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal__content {
  text-align: center;
  height: max-content;

  & h2 {
    line-height: 1.3;
  }

  & .body {
    text-align: left;
  }

  & .body .ghost-name {
    color: red;
  }
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.content-enter,
.content-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease-in-out;
}

.content-enter-active,
.content-leave-active {
  transition: all 0.25s ease-in-out;
}
</style>
