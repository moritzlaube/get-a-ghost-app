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
          p Find me a ...
          BaseSelect(label="Find Ghostwriter or Moodscout" placeholder="Select a profession ..." id="profession" tabindex="0" :options="['Ghostwriter', 'Moodscout', 'All-in-1']" @input="handleSelect")

        div
          p writing in ...
          BaseSelect(label="Select a language" placeholder="Select a language" id="language" tabindex="0" :options="['English', 'German', 'French']" @input="handleSelect")
        
        client-only
          div
            p available on ...
            v-date-picker(v-model="form.dateRange" :model-config="modelConfig" mode="date" color="pink" is-dark is-range)
              template(v-slot="{ inputValue, inputEvents, isDragging }")
                div.date-range
                  div
                    BaseInput(:value="inputValue.start" v-on="inputEvents.start" placeholder="Start Date")
                  //- svg(fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor")
                  //-   path(d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z")
                  div.date-range__arrow
                    svg(viewBox="0 0 24 24" stroke="currentColor" width="18" height="18")
                      path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3")
                  div
                    BaseInput(:value="inputValue.end" v-on="inputEvents.end" placeholder="End Date")
        div
          p Choose your preferred category
          BaseSelect(label="Choose your category" placeholder="Choose a category (optional)" id="category" tabindex="0" :options="['None', 'People', 'Cars', 'Table-top', 'Slice-of-Life']" @input="handleSelect")
        BaseButton.mt-xxl(type="submit") GO FIND!
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
        dateRange: {
          start: null,
          end: null,
        },
      },
      modelConfig: {
        // type: 'string',
        // mask: 'iso',
        start: {
          timeAdjust: '00:00:00',
        },
        end: {
          timeAdjust: '23:59:59',
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

.date-range {
  display: flex;
  align-items: center;
}

// .date-range > * {
//   flex-basis: 100%;
// }

.date-range__arrow {
  display: flex;
  padding: var(--space-sm);
  color: (--var-text-light);
}
</style>

<style lang="scss">
.vc-container.vc-is-dark {
  background-color: var(--bg-dark-grey) !important;
  border-color: var(--mid-grey);
}
</style>
