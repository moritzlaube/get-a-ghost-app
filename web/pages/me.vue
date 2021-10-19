<template lang="pug">
  div.container
    h1 Edit Account
    form(@submit.prevent="handleSubmit" :class="{ loading: isLoading }").mt-xxl
      fieldset.flow
        div.split
          BaseInput(type="text" id="fname" name="fname" v-model="user.name.first" :placeholder="user.name.first" label="First Name")
          BaseInput(type="text" id="lname" name="lname" v-model="user.name.last" :placeholder="user.name.last" label="Last Name")
        BaseInput(type="text" id="company" name="company" v-model="user.company" :placeholder="user.company" label="Company")
        BaseInput(type="text" id="email" name="email" v-model="user.email" :placeholder="user.email" label="Email")
        BaseInput(type="tel" id="phone" name="phone" v-model="user.phone" :placeholder="user.phone" label="Phone")
      BaseButton(type="submit").mt-xxl.has-shadow SAVE
</template>

<script>
import { mapGetters } from 'vuex'

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
        phone: null,
      },
      error: null,
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
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
          phone,
        },
      } = this.$auth.user
      this.user.email = email
      this.user.name.first = first
      this.user.name.last = last
      this.user.company = company
      this.user.phone = phone
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true
      try {
        const { data: response } = await this.$axios.put('/users/me', this.user)
        await this.$auth.fetchUser()
        this.isLoading = false
        // eslint-disable-next-line no-console
        console.log(response)
      } catch (error) {
        this.error = error.response.data
      }
    },
  },
}
</script>
