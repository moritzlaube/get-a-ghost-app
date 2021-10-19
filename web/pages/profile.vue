<template lang="pug">
  div.container.flow
    h1 Edit Profile
    div
      span.label Select your profession
      BaseSelect(label="What's your field of expertise?" placeholder="Select ..." :id="'profession'" tabindex="0" :options="['Ghostwriter', 'Moodscout', 'Both']" v-model="form.profession")
    div(v-if="form.profession && form.profession === 'Ghostwriter'")
      span.label Select your language(s)
      div(v-for="lang in form.selectedLanguages" :key="lang") {{lang}}
      BaseSelect(label="Select your language" placeholder="Select ..." :id="'language'" tabindex="0" :options="languages" @input="handleLanguageSelect")
    div
      span.label Website (optional)
      BaseInput(type="text" id="website" name="website" v-model="form.website" placeholder="www.example.com" label="Website")
    div
      span.label About (english)
      BaseTextarea(id="about" name="about" v-model="form.about" rows="5" cols="33" placeholder="About You")
    div
      span.label Timezone
      BaseSelect(label="Select your timezone" placeholder="Select ..." :id="'timezone'" tabindex="0" :options="timezones" v-model="form.timezone")
    client-only
      v-date-picker(:value="null" color="pink" v-model="selectedDates" :model-config="modelConfig" :attributes="attrs" locale="en" is-dark is-range is-expanded @input="handleDatePicker" @dayclick="handleDelete")
</template>

<script>
import { isWithinInterval, parseISO, areIntervalsOverlapping } from 'date-fns'
import timezones from '@/assets/timezones.json'
import availableLanguages from '@/assets/languages.json'

export default {
  name: 'ProfilePage',
  middleware: ({ redirect, error, store }) => {
    // if (!store.state.auth.user.isGhost) redirect('/')
    if (!store.state.auth.user.isGhost)
      error({ statusCode: 404, message: 'Page not found' })
  },
  data() {
    return {
      isLoading: false,
      form: {
        profession: null,
        selectedLanguages: [],
        website: null,
        about: null,
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
      return availableLanguages.map((language) => language.language)
    },
  },
  mounted() {
    this.form.timezone = this.timezones.find((zone) =>
      zone.includes(Intl.DateTimeFormat().resolvedOptions().timeZone)
    )
  },
  methods: {
    handleLanguageSelect(language) {
      this.form.selectedLanguages = new Set([
        ...this.form.selectedLanguages,
        language,
      ])
    },
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
