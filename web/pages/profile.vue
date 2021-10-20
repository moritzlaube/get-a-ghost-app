<template lang="pug">
  div.container.flow
    code {{loggedInUser}}
    h1 Edit Profile
    div
      .label Select your profession
      ul.pill-bg(v-if="form.profession && form.profession.length > 0")
        li.pill(v-for="(type, i) in form.profession" :key="type") 
          span {{type}}
          svg(xmlns='http://www.w3.org/2000/svg' viewBox="0 0 24 24" width="14" fill='#FFF' @click="deleteType(i)")
            path(d='M0 0h24v24H0V0z' fill='none' opacity='.9')
            path(d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5 13.6L15.6 17 12 13.4 8.4 17 7 15.6l3.6-3.6L7 8.4 8.4 7l3.6 3.6L15.6 7 17 8.4 13.4 12l3.6 3.6z')
      BaseSelect(label="What's your field of expertise?" placeholder="Select ..." :id="'profession'" tabindex="0" :options="['Ghostwriter', 'Moodscout']" @input="handleTypeSelect")
    div(v-if="form.profession.includes('Ghostwriter')")  
      .label Select your language(s)
      ul.pill-bg(v-if="form.languages && form.languages.length > 0")
        li.pill(v-for="(lang, i) in form.languages" :key="lang") 
          span {{lang}}
          svg(xmlns='http://www.w3.org/2000/svg' viewBox="0 0 24 24" width="14" fill='#FFF' @click="deleteLanguage(i)")
            path(d='M0 0h24v24H0V0z' fill='none' opacity='.9')
            path(d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5 13.6L15.6 17 12 13.4 8.4 17 7 15.6l3.6-3.6L7 8.4 8.4 7l3.6 3.6L15.6 7 17 8.4 13.4 12l3.6 3.6z')
      BaseSelect(label="Select your language" placeholder="Select ..." :id="'language'" tabindex="0" :options="languages" @input="handleLanguageSelect")
    div
      .label Select your favorite categories (max. 3)
      ul.pill-bg(v-if="form.categories && form.categories.length > 0")
        li.pill(v-for="(cat, i) in form.categories" :key="cat") 
          span {{cat}}
          svg(xmlns='http://www.w3.org/2000/svg' viewBox="0 0 24 24" width="14" fill='#FFF' @click="deleteCategory(i)")
            path(d='M0 0h24v24H0V0z' fill='none' opacity='.9')
            path(d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5 13.6L15.6 17 12 13.4 8.4 17 7 15.6l3.6-3.6L7 8.4 8.4 7l3.6 3.6L15.6 7 17 8.4 13.4 12l3.6 3.6z')
      BaseSelect(label="Select your categories" placeholder="Select ..." :id="'category'" tabindex="0" :options="categories" @input="handleCategorySelect")
    div
      .label Website (optional)
      BaseInput(type="text" id="website" name="website" v-model="form.website" placeholder="www.example.com" label="Website")
    div
      .label About (english)
      BaseTextarea(id="about" name="about" v-model="form.about" rows="5" cols="33" placeholder="About You")
    div
      .label Your timezone
      BaseSelect(label="Select your timezone" placeholder="Select ..." :id="'timezone'" tabindex="0" :options="timezones" v-model="form.timezone")
    client-only
      div
        .label Your blocked dates
          span.label--subline Delete blocked dates by double-clicking a range
        v-date-picker(:value="null" color="pink" v-model="selectedDates" :model-config="modelConfig" :attributes="attrs" locale="en" is-dark is-range is-expanded @input="handleDatePicker" @dayclick="handleDelete")
</template>

<script>
import { mapGetters } from 'vuex'
import { isWithinInterval, parseISO, areIntervalsOverlapping } from 'date-fns'
import timezones from '@/assets/json/timezones.json'
import availableLanguages from '@/assets/json/languages.json'
import availableCategories from '@/assets/json/categories.json'

export default {
  name: 'ProfilePage',
  middleware: ({ redirect, error, store }) => {
    if (!store.state.auth.user.isGhost)
      error({ statusCode: 404, message: 'Page not found' })
  },
  data() {
    return {
      isLoading: false,
      form: {
        profession: [],
        languages: [],
        website: null,
        about: null,
        timezone: null,
        categories: [],
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
    ...mapGetters(['loggedInUser']),
    dates() {
      return this.attrs[0].dates
    },
    timezones() {
      return timezones.map((zone) => {
        return zone.offset + ' ' + zone.name
      })
    },
    languages() {
      return availableLanguages
    },
    categories() {
      return availableCategories
    },
  },
  created() {
    // get user info if there are any and prefill form
    if (this.loggedInUser) {
      // this.form.profession =
      //   this.loggedInUser.profile.type.length > 0
      //     ? this.loggedInUser.profile.type
      //     : null

      this.form.languages =
        this.loggedInUser.profile.language.length > 0
          ? this.loggedInUser.profile.language.map((i) => {
              return i.charAt(0).toUpperCase() + i.slice(1)
            })
          : []

      this.form.categories =
        this.loggedInUser.profile.categories.length > 0
          ? this.loggedInUser.profile.categories.map((i) => {
              return i.charAt(0).toUpperCase() + i.slice(1)
            })
          : []
    }

    // get local timezone
    this.form.timezone = this.timezones.find((zone) =>
      zone.includes(Intl.DateTimeFormat().resolvedOptions().timeZone)
    )
  },
  methods: {
    deleteLanguage(i) {
      this.form.languages.splice(i, 1)
    },
    deleteCategory(i) {
      this.form.categories.splice(i, 1)
    },
    deleteType(i) {
      this.form.profession.splice(i, 1)
    },
    handleLanguageSelect(language) {
      this.form.languages = Array.from(
        new Set([...this.form.languages, language])
      )
    },
    handleCategorySelect(category) {
      if (this.form.categories.length === 3) return
      this.form.categories = Array.from(
        new Set([...this.form.categories, category])
      )
    },
    handleTypeSelect(type) {
      if (
        this.form.profession.includes('Moodscout') &&
        !this.form.profession.includes('Ghostwriter') &&
        this.form.languages !== null
      )
        this.form.languages = []

      this.form.profession = Array.from(
        new Set([...this.form.profession, type])
      )
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
<style lang="scss" scoped>
.pill-bg {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.25rem;
  padding: 0.25rem 0 0.75rem 0;
}

.pill {
  display: inline-flex;
  background-color: var(--clr-pink);
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 0.25rem 0.5rem;
  font-size: var(--text-xs);
}

.pill > svg {
  cursor: pointer;
}
</style>
