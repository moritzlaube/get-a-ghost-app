<template lang="pug">
  div
    .flow(:class="{ loading: isLoading }")
      p(v-if="$fetchState.pending") Loading...
      p(v-else-if="error") Error while loading Ghosts. {{ error.message }}
      div(v-else)
        div(v-if="ghosts.ghostCount === 0 || ghosts.length === 0") 
          .no-ghost
            img(src="~/assets/images/no-ghost-icon.svg")
          p Sorry. There are no Ghosts available based on your query. Try a broader query or a different date.
        p(v-else-if="ghosts.ghostCount") We have {{ ghosts.ghostCount }} {{ ghosts.ghostCount === 1 ? 'Ghost' : 'Ghosts' }} available for you based on your query. Please 
          NuxtLink(to="/login") login
          | &nbsp;or 
          NuxtLink(to="/register") register
          | &nbsp;to get in contact with them.
        div(v-else).flow
          p Your available Ghosts. Click on the card for more info. Then tap the request button to send a request. 
          p Please remember that we'll send your name, company, email and phone information to the Ghost so that he/she can get in touch with you.
          transition-group(name="list" tag="ul" :css="false" @before-enter="beforeEnter" @enter="enter").flow
            GhostCard(v-for="(ghost, index) in ghosts" :key="ghost._id" :ghost="ghost" :data-index="index" :isAuthenticated="isAuthenticated" :userIsGhost="loggedInUser ? loggedInUser.isGhost : false" :loading="requestingGhost" @request="handleRequest")
    NotificationModal(:open="modalIsOpen")
      template(#heading) Thanks for your interest in this Ghost!
      template(#content) 
        p We have delivered a request to #[span(style="color: #ed408d; font-weight: 700") {{ requestedGhost.ghostName }}] and sent your contact details (email and phone) along with it. Your Ghost will get back to you shortly. 
        p Until then, we'd like to thank you for using our services and hope to hear from you soon. Please don't hesitate to send us an #[a(href="mailto:hi@get-a-ghost.com") email] should you have any questions or comments.
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
      isLoading: false,
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
    } catch (errors) {
      const errorResponse = this.$errorHandler.setAndParse(errors)
      this.error = errorResponse.message
    }
  },
  fetchOnServer: false,
  fetchDelay: 500,
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    async handleRequest(ghost) {
      this.isLoading = true
      this.requestingGhost = true
      this.requestedGhost = ghost
      // send request to backend including data of requesting user
      try {
        await this.$axios.post(`/ghosts/${ghost._id}/request`, {
          user: this.loggedInUser,
          requestedDates: ghost.requestedDates,
        })
        this.requestingGhost = true
        this.modalIsOpen = true
      } catch (errors) {
        const errorResponse = this.$errorHandler.setAndParse(errors)

        this.$notify({
          type: 'error',
          title: 'Error:' + errorResponse.status,
          text: errorResponse.message,
          duration: 5000,
        })
      } finally {
        this.isLoading = false
      }
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

<style lang="scss" scoped>
.no-ghost img {
  margin: 0 auto;
  width: 100px;
  margin-bottom: 2rem;
}
</style>
