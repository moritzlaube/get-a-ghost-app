<template lang="pug">
  .container.flow
    p(v-if="$fetchState.pending") Loading...
    p(v-else-if="$fetchState.error") Error while loading Ghosts.
    div(v-else)
      p(v-if="ghosts.ghostCount") We have {{ ghosts.ghostCount }} Ghosts available for you based on your query. Please login or register to get in contact with them.
      div(v-else).flow
        p Your available Ghosts. Click on the card for more info. Or tap the button  to send a request.
        transition-group(name="list" tag="ul" :css="false" @before-enter="beforeEnter" @enter="enter").flow
          GhostCard(v-for="(ghost, index) in ghosts" :key="ghost._id" :ghost="ghost" :data-index="index")
    code {{ghosts}}
</template>

<script>
import { gsap } from 'gsap'

export default {
  name: 'GhostsList',
  layout: 'onboarding',
  data() {
    return {
      response: '',
      ghosts: [],
    }
  },
  async fetch() {
    const { data } = await this.$axios.get('/ghosts', {
      params: this.$route.query,
    })

    this.ghosts = data.data
  },
  fetchOnServer: false,
  methods: {
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
