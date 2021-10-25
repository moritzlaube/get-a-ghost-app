<template lang="pug">
  .container.flow
    p(v-if="$fetchState.pending") Loading...
    p(v-else-if="error") Error while loading Ghosts. {{ error.message }}
    div(v-else)
      p(v-if="ghosts.ghostCount === 0 || ghosts.length === 0") There are no Ghosts available based on your query. Try a broader query or a different date.
      p(v-else-if="ghosts.ghostCount") We have {{ ghosts.ghostCount }} Ghosts available for you based on your query. Please login or register to get in contact with them.
      div(v-else).flow
        p Your available Ghosts. Click on the card for more info. Then tap the button to send a request.
        transition-group(name="list" tag="ul" :css="false" @before-enter="beforeEnter" @enter="enter").flow
          GhostCard(v-for="(ghost, index) in ghosts" :key="ghost._id" :ghost="ghost" :data-index="index" :loading="requestingGhost" @request="handleRequest")
    
    NotificationModal(:open="modalIsOpen")
      template(#heading) Thanks for your interest in this Ghost!
      template(#content) 
        p We have delivered a request to #[span(style="color: #ed408d; font-weight: 700") {{ requestedGhost.ghostName }}] and sent your contact details (email and phone) along with it. Your Ghost will get back to you shortly. 
        p Until then, we'd like to thank you for using our services and hope to hear from you soon. Please don't hesitate to shoot as an #[a(href="mailto:hi@get-a-ghost.com") email] should you have any questions or comments.
      template(#button)
        BaseButton(@click="modalIsOpen=false") GOT IT!
</template>

<script>
import { gsap } from 'gsap'
import { mapGetters } from 'vuex'

export default {
  name: 'GhostsList',
  provide() {
    return { Card: this.Card }
  },
  layout: 'onboarding',
  data() {
    return {
      ghosts: [],
      requestedGhost: null,
      requestingGhost: false,
      modalIsOpen: false,
      Card: {
        active: null,
      },
      error: null,
    }
  },
  async fetch() {
    try {
      const { data } = await this.$axios.get('/ghosts', {
        params: this.$route.query,
      })

      this.ghosts = data.data
    } catch (error) {
      this.error = error.response.data
    }
  },
  fetchOnServer: false,
  fetchDelay: 500,
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    async handleRequest(ghost) {
      this.requestingGhost = true
      this.requestedGhost = ghost
      // send request to backend including data of requesting user
      try {
        await this.$axios.post(`/ghosts/${ghost._id}/request`, {
          user: this.loggedInUser,
        })
        this.requestingGhost = true
        this.modalIsOpen = true
      } catch (error) {}
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
