<template lang="pug">
  div.container
    div(v-if="$fetchState.pending")
      BaseGhostIcon.centered
      p.center-align.mt-md Loading ...
    p(v-if="error") {{error.message}}
      pre {{ form }}
    div.flow(v-else)
      div
        p Welcome on board {{form.firstName}}!
        p We are happy to have you. Please fill out this form. As soon as you're finished you'll be instantly discoverable by anyone who seeks help.
      form.flow
      div
        span Email
        BaseInput(type="email" id="email" name="email" v-model="form.email" placeholder="Email" label="Email" disabled)
      div.split
        div
          span First Name
          BaseInput(type="text" id="firstName" name="firstName" v-model="form.firstName" placeholder="First Name" label="First Name" required)
        div
          span Last Name
          BaseInput(type="text" id="lastName" name="lastName" v-model="form.lastName" placeholder="Last Name" label="Last Name" required)
      div
        span Ghost Name (optional)
        BaseInput(type="text" id="ghostName" name="ghostName" v-model="form.ghostName" :placeholder="form.firstName + ' ' + form.lastName" label="Ghost Name")
      div
        span Select your profession
        BaseSelect(label="What's your field of expertise?" placeholder="Select ..." :id="'profession'" tabindex="0" :options="['Ghostwriter', 'Moodscout', 'Both']" v-model="form.profession")
      div(v-if="form.profession && form.profession === 'Ghostwriter'")
        span Select your language
        BaseSelect(label="Select your language" placeholder="Select ..." :id="'language'" tabindex="0" :options="languages" v-model="form.language")
      div
        span Phone
        BaseInput(type="tel" id="phone" name="phone" v-model="form.phone" placeholder="+491511234567" label="Phone" required)
      div
        span Website (optional)
        BaseInput(type="text" id="website" name="website" v-model="form.website" placeholder="www.example.com" label="Website")
      div
        span About (english)
        BaseTextarea(id="about" name="about" v-model="form.about" rows="5" cols="33" placeholder="About You")
      div
        span Timezone
        BaseSelect(label="Select your timezone" placeholder="Select ..." :id="'timezone'" tabindex="0" :options="timezones" v-model="form.timezone")
      v-date-picker(:value="null" color="pink" v-model="selectedDates" :model-config="modelConfig" :attributes="attrs" locale="en" is-dark is-range is-expanded @input="handleDatePicker" @dayclick="handleDelete")
      BaseButton Create Account
</template>

<script>
import { isWithinInterval, parseISO, areIntervalsOverlapping } from 'date-fns'
import timezones from '@/assets/timezones.json'
import languages from '@/assets/languages.json'

export default {
  name: 'VerifyAndOnboard',
  auth: false,
  data() {
    return {
      form: {
        firstName: 'First Name',
        lastName: 'Last Name',
        timezone: null,
      },
      timer: null,
      clicks: 0,
      delay: 200,
      error: null,
      selectedDates: null,
      modelConfig: {
        type: 'string',
        mask: 'iso',
        start: {
          timeAdjust: '12:00:00',
        },
        end: {
          timeAdjust: '12:00:00',
        },
      },
      attrs: [
        {
          highlight: {
            start: { fillMode: 'outline' },
            base: { fillMode: 'light' },
            end: { fillMode: 'outline' },
          },
          dates: [],
        },
      ],
    }
  },
  async fetch() {
    const { token } = this.$route.query
    try {
      const { data } = await this.$axios.$get(`/auth/invite/${token}`)
      this.form = data
    } catch (error) {
      if (error.response.data) this.form = error.response.data.data
      this.error = {
        message: error.response.data.message,
        status: error.response.status,
      }
    }
  },
  computed: {
    dates() {
      return this.attrs[0].dates
    },
    timezones() {
      return timezones.map((zone) => {
        return zone.offset + ' ' + zone.name
      })
    },
    languages() {
      return languages.map((language) => language.language)
    },
  },
  mounted() {
    this.form.timezone = this.timezones.find((zone) =>
      zone.includes(Intl.DateTimeFormat().resolvedOptions().timeZone)
    )
  },
  methods: {
    handleDatePicker(range) {
      const index = this.dates.findIndex((date) =>
        areIntervalsOverlapping(range, date, { inclusive: true })
      )
      if (index > -1) {
        this.attrs[0].dates.splice(index, 1)
      }
      this.attrs[0].dates.push(range)
    },
    handleDelete(event) {
      this.clicks++
      if (this.clicks === 1) {
        this.timer = setTimeout(() => {
          this.clicks = 0
        }, this.delay)
      } else {
        clearTimeout(this.timer)
        const index = this.dates.findIndex((date) => {
          return isWithinInterval(parseISO(event.id), date)
        })
        this.attrs[0].dates.splice(index, 1)
        this.clicks = 0
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.pill-background {
  background-color: white;
  padding: 10px;
  border-radius: 10px;
}
</style>
