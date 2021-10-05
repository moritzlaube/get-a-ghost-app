<template lang="pug">
  div(:class="{ 'show-nav': isOpen }" v-on="$listeners").profile__wrapper
    .profile
        .profile__initials
            slot
    svg(width="10" height="8" fill="none" xmlns="http://www.w3.org/2000/svg")
      path(d="M8.8.8 5 4.8 1.2.8 0 2l5 5.2L10 2 8.8.8Z" fill="#C4C4C4")
</template>

<script>
export default {
  name: 'ProfileIcon',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.profile__wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;

  & svg {
    margin-left: var(--space-xs);
    transition: transform 0.25s ease-in-out;
  }
}

.show-nav svg {
  transform: rotate(180deg);
}

.profile {
  display: flex;
  background-color: var(--bg-dark-grey);
  box-shadow: 3px 3px 8px var(--shadow-dark), -3px -3px 8px var(--shadow-light);
  border-radius: 50%;
  border: 1px solid var(--mid-grey);
  color: var(--text-light);
  font-weight: var(--fw-bold);
  font-size: var(--text-lg);
  width: 3rem;
  height: 3rem;
  line-height: 0.5;
}

.profile__initials {
  margin: auto;
}
</style>
