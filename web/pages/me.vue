<template lang="pug">
  div.container
    h1 Edit Profile
    form(@submit.prevent="handleSubmit" :class="{ loading: isLoading }")
      fieldset.flow
        div.split
          BaseInput(type="text" id="fname" name="fname" v-model="user.profile.name.first" :placeholder="user.profile.name.first" label="First Name")
          BaseInput(type="text" id="lname" name="lname" v-model="user.profile.name.last" :placeholder="user.profile.name.last" label="Last Name")
        BaseInput(type="text" id="company" name="company" v-model="user.profile.company" :placeholder="user.profile.company" label="Company")
        BaseInput(type="text" id="email" name="email" v-model="user.email" :placeholder="user.email" label="Email")
        BaseInput(type="tel" id="phone" name="phone" v-model="user.profile.phone" :placeholder="user.profile.phone" label="Phone")
      BaseButton(type="submit").mt-xxl.has-shadow SAVE
    code {{ loggedInUser }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AccountPage',
  data() {
    return {
      isLoading: false,
      user: null,
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
  created() {
    if (this.$auth.user) {
      // deep copy object to be able to mutate
      this.user = JSON.parse(JSON.stringify(this.$auth.user))
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true
      this.$auth.setUser(this.user)

      try {
        const { data: response } = await this.$axios.put('/users/me', this.user)

        this.isLoading = false
        // eslint-disable-next-line no-console
        console.log(response)
      } catch (error) {}
    },
  },
}
</script>

<style lang="scss" scoped>
h1 {
  color: var(--clr-pink);
}
</style>
