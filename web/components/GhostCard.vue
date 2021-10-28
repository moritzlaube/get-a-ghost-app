<template lang="pug">
  li.card(ref="card" :class="{ loading: isLoading }")
    .card__top(@click="expand")
      div.flow
        h2.card__name {{ ghost.ghostName }}
        .card__type {{ uppercaseFirstLetter(ghost.type).join(' & ') }}
      BaseButton(v-if="expanded && isAuthenticated && !userIsGhost" @click.stop="handleRequest") Request
      i(v-else)
        svg(xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="#FFF")
          path(d="M0 0h24v24H0V0z" fill="none")
          path(d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z")
    transition(name="expand" @enter="enter" @leave="leave")
      div(v-show="expanded").card__content.flow
        .card__content__section.flow
          h3.subheading About
          p {{ ghost.about }}
        .card__content__section.flow(v-if="ghost.categories && ghost.categories.length > 0")
          .subheading Tags:
            span &nbsp;{{ uppercaseFirstLetter(ghost.categories).join(', ') }}
    transition
    .card__bottom.mt-sm
        div.timezone 
          svg(width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg")
            path(d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-18a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm.5 5v5.3l4.5 2.6-.8 1.3L9 11V5h1.5Z" fill="currentColor")
          span {{ ghost.timezone.split(' ')[1] }}
        div(v-if="$route.query.startDate").available 
          svg(width="19" height="20" fill="none" xmlns="http://www.w3.org/2000/svg")
            path(d="M16.9 18H2V7H17v11Zm0-16h-1V0h-2.2v2H5.3V0H3.2v2h-1A2 2 0 0 0 0 4v14c0 .5.2 1 .6 1.4.4.4 1 .6 1.5.6H17c.5 0 1-.2 1.5-.6.4-.4.6-.9.6-1.4V4c0-.5-.2-1-.6-1.4-.4-.4-1-.6-1.5-.6Zm-2.6 8-1.1-1L8 13.9l-2.2-2.1-1.1 1L8 16l6.3-6Z" fill="currentColor")
          span {{ availableDates }}
</template>

<script>
export default {
  name: 'GhostCard',
  inject: ['Card'],
  props: {
    ghost: {
      type: Object,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
    userIsGhost: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    expanded() {
      return this.ghost._id === this.Card.active
    },
    availableDates() {
      const { startDate, endDate } = this.$route.query
      const start = new Date(startDate).toLocaleDateString('en-En', {})
      const end = new Date(endDate).toLocaleDateString('en-En', {})
      return `${start.split('/').slice(0, 2).join('/')} - ${end
        .split('/')
        .slice(0, 2)
        .join('/')}`
    },
  },
  methods: {
    handleRequest() {
      this.$emit('request', {
        ...this.ghost,
        requestedDates: {
          start: this.$route.query.startDate,
          end: this.$route.query.endDate,
        },
      })
    },
    expand() {
      if (this.expanded) {
        this.Card.active = null
      } else {
        this.Card.active = this.ghost._id
      }
    },
    enter(el) {
      el.style.height = el.scrollHeight + 'px'
      el.style.marginTop = '1rem'
      el.style.visibility = 'visible'
    },
    leave(el) {
      el.style.height = ''
      el.style.marginTop = ''
    },
    uppercaseFirstLetter(a) {
      return a.map((el) => el.charAt(0).toUpperCase() + el.slice(1))
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

.card__content {
  font-size: var(--text-sm);
  height: 0;
  visibility: hidden;
  overflow: hidden;
  display: block !important;

  & .subheading {
    font-weight: var(--fw-regular);
    font-size: var(--text-sm);
    color: var(--clr-pink);
  }
}

.card__content__section.flow > * {
  --flow-spacer: 0.25rem;
}

.card__content__section span {
  color: var(--text-mid-grey);
}

.card__top {
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  --flow-spacer: 0.25rem;
}

.card__top button {
  width: min-content;
}

.card__top i {
  display: flex;
  padding: 6px 0 6px 10px;
  height: min-content;
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

.expand-enter,
.expand-leave-to {
  opacity: 0;
}

.expand-enter-active,
.expand-leave-active {
  will-change: height, opacity, margin;
  transition: height 0.25s ease-out, opacity 0.25s ease-out,
    margin 0.25s ease-out;
}
</style>
