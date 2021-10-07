<template lang="pug">
  nav(:class="{ 'show-nav': isOpen }")
    .nav__background
      ul.nav__wrapper
        li(@click="$emit('close')")
          NuxtLink(to="/me")
            span Edit Account
            i 
              svg(width="10" height="8" fill="none" xmlns="http://www.w3.org/2000/svg")
                path(d="M8.8.8 5 4.8 1.2.8 0 2l5 5.2L10 2 8.8.8Z" fill="#C4C4C4")
        li(@click="$emit('close')")
          NuxtLink(to="/")
            span Privacy & Security
            i 
              svg(width="10" height="8" fill="none" xmlns="http://www.w3.org/2000/svg")
                path(d="M8.8.8 5 4.8 1.2.8 0 2l5 5.2L10 2 8.8.8Z" fill="#C4C4C4")
        li(@click="$auth.logout(); $emit('close')").logout
          span Log Out
</template>

<script>
export default {
  name: 'BaseNavigation',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
nav {
  position: absolute;
  margin-top: var(--space-sm);
  right: var(--space-sm);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.25s ease-in-out;
  z-index: 999;
}

.nav__background {
  background-color: var(--bg-dark-grey);
  border: 1px solid var(--mid-grey);
  border-radius: 5px;
  box-shadow: 5px 5px 12px var(--shadow-dark);
}

.nav__wrapper {
  padding: var(--space-md) 0;
  border-radius: 5px;

  li a,
  li.logout {
    display: flex;
    justify-content: space-between;
    padding: var(--space-xs) var(--space-xxl);
    color: var(--text-light);
    text-decoration: none;
    cursor: pointer;
  }

  li:hover {
    background-color: var(--mid-grey);
  }

  li span {
    margin-right: var(--space-xxxl);
  }

  li i {
    transform: rotate(-90deg);
  }

  li.logout {
    color: var(--clr-pink);
  }
}

nav.show-nav {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
</style>
