<template lang="pug">
  li.card
    .card__top
      div
        .card__name {{ ghost.ghostName }}
        .card__type {{ uppercaseFirstLetter.join(' & ') }}
      BaseButton Request
    .card__bottom.mt-sm
        div.timezone 
          svg(width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg")
            path(d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-18a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm.5 5v5.3l4.5 2.6-.8 1.3L9 11V5h1.5Z" fill="currentColor")
          span {{ ghost.timezone }}
        div(v-if="$route.query.startDate").available 
          svg(width="19" height="20" fill="none" xmlns="http://www.w3.org/2000/svg")
            path(d="M16.9 18H2V7H17v11Zm0-16h-1V0h-2.2v2H5.3V0H3.2v2h-1A2 2 0 0 0 0 4v14c0 .5.2 1 .6 1.4.4.4 1 .6 1.5.6H17c.5 0 1-.2 1.5-.6.4-.4.6-.9.6-1.4V4c0-.5-.2-1-.6-1.4-.4-.4-1-.6-1.5-.6Zm-2.6 8-1.1-1L8 13.9l-2.2-2.1-1.1 1L8 16l6.3-6Z" fill="currentColor")
          span {{ availableDates }}
</template>

<script>
export default {
  name: 'GhostCard',
  props: {
    ghost: {
      type: Object,
      required: true,
    },
  },
  computed: {
    uppercaseFirstLetter() {
      return this.ghost.type.map(
        (el) => el.charAt(0).toUpperCase() + el.slice(1)
      )
    },
    availableDates() {
      const { startDate, endDate } = this.$route.query
      const start = new Date(startDate).toLocaleDateString('en-En', {})
      const end = new Date(endDate).toLocaleDateString('en-En', {})
      return `${start} - ${end}`
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  border: red;
  border-radius: 5px;
  box-shadow: 5px 5px 12px var(--shadow-dark),
    -5px -5px 12px var(--shadow-light);
  padding: var(--space-md);
}

.card__top {
  display: flex;
  justify-content: space-between;
}

.card__top button {
  width: min-content;
}

.card__name {
  font-size: var(--text-lg);
  font-weight: var(--fw-bold);
  color: var(--clr-pink);
}

.card__type {
  font-size: var(--text-sm);
}

.card__bottom {
  font-size: var(--text-sm);
  color: var(--text-mid-grey);
  display: flex;
  justify-content: space-between;
}

.card__bottom .available,
.card__bottom .timezone {
  display: flex;
}

.card__bottom .available svg,
.card__bottom .timezone svg {
  margin-right: 0.5rem;
}
</style>
