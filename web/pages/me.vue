<template lang="pug">
  div.container
    BaseBackButton(@click="$router.go(-1)") Go back
    h1.mt-xxl Edit Account
    form(@submit.prevent="handleSubmit" :class="{ loading: isLoading }").mt-xxl
      fieldset.flow
        div.split
          div
            p.label First Name
            BaseInput(type="text" id="fname" name="fname" v-model="user.name.first" :placeholder="user.name.first" label="First Name")
          div
            p.label Last Name
            BaseInput(type="text" id="lname" name="lname" v-model="user.name.last" :placeholder="user.name.last" label="Last Name")
        div(v-if="!loggedInUser.isGhost")
          p.label Company
          BaseInput(type="text" id="company" name="company" v-model="user.company" :placeholder="user.company" label="Company")
        div(v-else)
          p.label Ghost Name
          BaseInput(type="text" id="ghost-name" name="ghost-name" v-model="user.ghostName" :placeholder="user.ghostName" label="Your Ghost Name")
        div
          p.label Email
          BaseInput(type="text" id="email" name="email" v-model="user.email" :placeholder="user.email" label="Email")
        div 
          p.label Phone
          .phone-split
            BaseSearchSelect(type="tel" id="country-code" v-model="user.countryCode" :options="Array.from(countryCodes)" :pre-selected="user.countryCode" required)
            BaseInput(type="tel" id="phone" name="phone" v-model="user.phone" :placeholder="user.phone" label="Phone" required)
      BaseButton(type="submit").mt-xxl.has-shadow SAVE
</template>

<script>
import { mapGetters } from 'vuex'
import countryCodes from '@/assets/json/country-codes.json'

export default {
  name: 'AccountPage',
  data() {
    return {
      isLoading: false,
      user: {
        name: {
          first: null,
          last: null,
        },
        email: null,
        company: null,
        ghostName: null,
        countryCode: null,
        phone: null,
      },
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
    countryCodes() {
      return new Set(countryCodes.map((code) => code.dial_code))
    },
  },
  created() {
    if (this.$auth.user) {
      // deep copy object to be able to mutate
      // this.user = JSON.parse(JSON.stringify(this.$auth.user))
      const {
        email,
        profile: {
          name: { first, last },
          company,
          ghostName,
          countryCode,
          phone,
        },
      } = this.$auth.user

      this.user.email = email
      this.user.name.first = first
      this.user.name.last = last
      this.user.company = company
      this.user.ghostName = ghostName
      this.user.countryCode = countryCode
      this.user.phone = phone
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true
      try {
        await this.$axios.put('/users/me', this.user)
        await this.$auth.fetchUser()

        this.$notify({
          type: 'success',
          title: 'Account updated',
          text: 'You successfully updated your account information.',
          duration: 3000,
        })
      } catch (errors) {
        const errorResponse = this.$errorHandler.setAndParse(errors)

        this.$notify({
          type: 'error',
          title: 'Error:' + errorResponse.status,
          text: errorResponse.message,
          duration: 3000,
        })
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.country-code {
  flex-basis: 30%;
}
</style>
