<template lang="pug">
  div
    header
      div.container
        BaseGhostLogo(style="width: 65%")
        BaseProfileIcon(v-if="isAuthenticated") {{ loggedInUser.userData.initials }}
    div.container
      p Find all the availabe Ghosts for a given timeframe. If your dates are flexible, please check the appropriate box.
      
      form(@submit.prevent="onSubmit")
        div
          p Find me a
          BaseSelect(label="Find Ghostwriter or Moodscout" placeholder="Select a profession ..." id="profession" tabindex="0" :options="['Ghostwriter', 'Moodscout', 'All-in-1']" @input="handleSelect")

        div
          p writing in
          BaseSelect(label="Select a language" placeholder="Select a language" id="language" tabindex="0" :options="['English', 'German', 'French']" @input="handleSelect")
        
        client-only
          div
            p available on
            v-date-picker(v-model="form.range" mode="date" color="pink" is-dark is-range)
              template(v-slot="{ inputValue, inputEvents, isDragging }")
                div
                  BaseInput(:value="inputValue.start" v-on="inputEvents.start" placeholder="Start Date")
                div
                  BaseInput(:value="inputValue.end" v-on="inputEvents.end" placeholder="End Date")
      pre 
        code {{isAuthenticated}}
        br
        code {{loggedInUser}}
      button(@click="logout") Logout
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Homepage',
  auth: false,
  data() {
    return {
      form: {
        range: {
          start: null,
          end: null,
        },
      },
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    handleSelect(payload) {
      Object.assign(this.form, payload)
    },
    async onsubmit() {},
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  box-shadow: 0 12px 12px -2px var(--shadow-dark);
  margin-bottom: var(--space-sm);
}

header > div {
  display: flex;
  justify-content: space-between;
  padding: var(--space-xl) var(--space-sm);
}
</style>
