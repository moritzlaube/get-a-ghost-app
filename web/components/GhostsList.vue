<template lang="pug">
  .container.flow
    p(v-if="$fetchState.pending") Loading...
    p(v-else-if="$fetchState.error") Error while loading Ghosts.
    div(v-else)
      p(v-if="ghosts.ghostCount === 0") There are no Ghosts available based on your query. Try a broader query or a different date.
      p(v-else-if="ghosts.ghostCount") We have {{ ghosts.ghostCount }} Ghosts available for you based on your query. Please login or register to get in contact with them.
      div(v-else).flow
        p Your available Ghosts. Click on the card for more info. Or tap the button  to send a request.
        transition-group(name="list" tag="ul" :css="false" @before-enter="beforeEnter" @enter="enter").flow
          GhostCard(v-for="(ghost, index) in ghosts" :key="ghost._id" :ghost="ghost" :data-index="index")
    NotificationModal(v-if="Card.request.success")
      template(#heading) Thanks for your interest in this Ghost!
      template(#content) We have notified #[span {{ Card.request.ghost.ghostName }}] of your request. 
</template>

<script>
import { gsap } from 'gsap'

export default {
  name: 'GhostsList',
  provide() {
    return { Card: this.Card }
  },
  layout: 'onboarding',
  data() {
    return {
      requestedGhost: null,
      ghosts: [],
      Card: {
        active: null,
        request: {
          ghost: null,
          pending: false,
          success: null,
        },
      },
    }
  },
  async fetch() {
    const { data } = await this.$axios.get('/ghosts', {
      params: this.$route.query,
    })

    this.ghosts = data.data
  },
  fetchOnServer: false,
  // watch: {
  //   '$route.query': '$fetch',
  // },
  methods: {
    handleClick(index) {
      this.clickedCard = index
    },
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.transform = 'translateY(10px)'
    },
    enter(el, done) {
      const delay = el.dataset.index * 0.2
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay,
      })
    },
  },
}
</script>
