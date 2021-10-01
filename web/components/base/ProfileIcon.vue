<template lang="pug">
    .profile
        .profile__initials
            slot
</template>

<script>
export default {
  name: 'ProfileIcon',
}
</script>

<style lang="scss" scoped>
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
