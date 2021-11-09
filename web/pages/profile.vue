<template lang="pug">
  div.container
    div.flow(v-if="!showAccountCreatedMessage")
      h1 Edit Profile
      BaseBackButton(v-if="loggedInUser.profile.active" @click="$router.go(-1)") Go Back
      form.flow(@submit.prevent="handleSubmit" :class="{ loading: isLoading }")
        div
          .label Select your profession
          ul.pill-bg(v-if="form.type && form.type.length > 0")
            li.pill(v-for="(type, i) in form.type" :key="type") 
              span {{type}}
              svg(xmlns='http://www.w3.org/2000/svg' viewBox="0 0 24 24" width="14" fill='#FFF' @click="deleteType(i)")
                path(d='M0 0h24v24H0V0z' fill='none' opacity='.9')
                path(d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5 13.6L15.6 17 12 13.4 8.4 17 7 15.6l3.6-3.6L7 8.4 8.4 7l3.6 3.6L15.6 7 17 8.4 13.4 12l3.6 3.6z')
          BaseSelect(label="What's your field of expertise?" placeholder="Select ..." :id="'profession'" tabindex="0" :options="['Ghostwriter', 'Moodscout']" @input="handleTypeSelect")
        div(v-if="form.type.includes('Ghostwriter')")  
          .label Select your language(s)
          ul.pill-bg(v-if="form.languages && form.languages.length > 0")
            li.pill(v-for="(lang, i) in form.languages" :key="lang") 
              span {{lang}}
              svg(xmlns='http://www.w3.org/2000/svg' viewBox="0 0 24 24" width="14" fill='#FFF' @click="deleteLanguage(i)")
                path(d='M0 0h24v24H0V0z' fill='none' opacity='.9')
                path(d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5 13.6L15.6 17 12 13.4 8.4 17 7 15.6l3.6-3.6L7 8.4 8.4 7l3.6 3.6L15.6 7 17 8.4 13.4 12l3.6 3.6z')
          BaseSelect(label="Select your language" placeholder="Select ..." :id="'language'" tabindex="0" :options="languages" @input="handleLanguageSelect")
        div
          .label Select your favorite categories
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
          div.space-between
            .label About (english) 
            span.label(:class="{ exceed: wordCount < 0 }") {{ wordCount }}
          BaseTextarea(id="about" name="about" v-model="form.about" rows="5" cols="33" placeholder="About You")
        div
          .label Your timezone
          BaseSelect(label="Select your timezone" placeholder="Select ..." :id="'timezone'" tabindex="0" :options="timezones" v-model="form.timezone")
        client-only
          div
            .label Your blocked dates
              span.label--subline Delete blocked dates by double-clicking a day within a range
            v-date-picker(:value="null" color="pink" v-model="selectedDates" :model-config="modelConfig" :attributes="attrs" locale="en" :min-date="new Date()" is-dark is-range is-expanded @input="handleDatePicker" @dayclick="handleDateDelete")
        BaseButton(:disabled="!(form.type && form.about && form.timezone && wordCount >= 0)" type="submit") Update Profile
    div.flow(v-else)
      h1 Congratulations!
      p You just activated your account! From now on, our registered users will be able to find you on our platform. We wish you the best of luck! Please don't hesitate to #[a(href="mailto:hi@get-a-ghost.com") contact] us if you have any questions or issues with our app.
      p Your 
        span.emphasize Get A Ghost 
        | team
</template>

<script>
import { mapGetters } from 'vuex'
import { isWithinInterval, parseISO, areIntervalsOverlapping } from 'date-fns'
import timezones from '@/assets/json/timezones.json'
import availableLanguages from '@/assets/json/languages.json'
import availableCategories from '@/assets/json/categories.json'
import confetti from 'canvas-confetti'

export default {
  name: 'ProfilePage',
  middleware: ({ redirect, error, store }) => {
    if (!store.state.auth.user.isGhost)
      error({ statusCode: 404, message: 'Page not found' })
  },
  data() {
    return {
      isLoading: false,
      showAccountCreatedMessage: false,
      form: {
        type: [],
        languages: [],
        website: null,
        about: '',
        timezone: null,
        categories: [],
      },
      timer: null,
      clicks: 0,
      delay: 200,
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
        {
          key: 'today',
          dot: true,
          dates: new Date(),
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['loggedInUser']),
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
    wordCount() {
      return 250 - this.form.about.length
    },
  },
  created() {
    // get user info if there are any and prefill form
    if (this.loggedInUser) {
      this.form.type = this.loggedInUser.profile
        ? this.loggedInUser.profile.type.map((i) => {
            return i.charAt(0).toUpperCase() + i.slice(1)
          })
        : []

      this.form.languages = this.loggedInUser.profile
        ? this.loggedInUser.profile.languages.map((i) => {
            return i.charAt(0).toUpperCase() + i.slice(1)
          })
        : []

      this.form.categories = this.loggedInUser.profile
        ? this.loggedInUser.profile.categories.map((i) => {
            return i.charAt(0).toUpperCase() + i.slice(1)
          })
        : []

      this.form.timezone = this.loggedInUser.profile.timezone
        ? this.loggedInUser.profile.timezone
        : null

      const parsedDates = this.loggedInUser.profile.blocked
        .map((range) => {
          return {
            ...range,
            start: parseISO(range.start),
            end: parseISO(range.end),
          }
        })
        .filter((range) => range.end.getTime() > Date.now())

      this.attrs[0].dates = this.loggedInUser.profile.blocked
        ? [...parsedDates]
        : []

      this.form.website = this.loggedInUser.profile.website
        ? this.loggedInUser.profile.website
        : null

      this.form.about = this.loggedInUser.profile.about
        ? this.loggedInUser.profile.about
        : ''
    }

    // get local timezone
    if (!this.form.timezone && this.timezones !== undefined) {
      this.form.timezone = this.timezones.find((zone) =>
        zone.includes(Intl.DateTimeFormat().resolvedOptions().timeZone)
      )
    }
  },
  methods: {
    async handleSubmit() {
      const query = {
        type: this.form.type,
        languages: this.form.languages.length > 0 ? this.form.languages : null,
        categories:
          this.form.categories.length > 0 ? this.form.categories : null,
        website: this.form.website || null,
        about: this.form.about || null,
        timezone: this.form.timezone || null,
        blocked: this.attrs[0].dates,
      }

      try {
        this.isLoading = true
        await this.$axios.put(`/ghosts/${this.loggedInUser._id}`, query)

        const firstTimeUpdatingProfile = !this.loggedInUser.profile.active

        await this.$auth.fetchUser()

        if (firstTimeUpdatingProfile) {
          this.showAccountCreatedMessage = true
          confetti()
        } else {
          this.$notify({
            type: 'success',
            title: 'Profile updated',
            text: 'You successfully updated your profile.',
            duration: 5000,
          })
        }
      } catch (errors) {
        const errorResponse = this.$errorHandler.setAndParse(errors)

        this.$notify({
          type: 'error',
          title: errorResponse.status,
          text: 'Error:' + errorResponse.message,
          duration: 5000,
        })
      } finally {
        this.isLoading = false
      }
    },
    deleteLanguage(i) {
      this.form.languages.splice(i, 1)
    },
    deleteCategory(i) {
      this.form.categories.splice(i, 1)
    },
    deleteType(i) {
      this.form.type.splice(i, 1)
    },
    handleLanguageSelect(language) {
      this.form.languages = Array.from(
        new Set([...this.form.languages, language])
      )
    },
    handleCategorySelect(category) {
      this.form.categories = Array.from(
        new Set([...this.form.categories, category])
      )
    },
    handleTypeSelect(type) {
      if (
        this.form.type.includes('Moodscout') &&
        !this.form.type.includes('Ghostwriter') &&
        this.form.languages !== null
      )
        this.form.languages = []

      this.form.type = Array.from(new Set([...this.form.type, type]))
    },
    handleDatePicker(range) {
      const index = this.attrs[0].dates.findIndex((date) => {
        return areIntervalsOverlapping(range, date, { inclusive: true })
      })
      if (index > -1) {
        this.attrs[0].dates.splice(index, 1)
      }
      this.attrs[0].dates.push(range)
    },
    handleDateDelete(event) {
      this.clicks++
      if (this.clicks === 1) {
        this.timer = setTimeout(() => {
          this.clicks = 0
        }, this.delay)
      } else {
        clearTimeout(this.timer)
        const index = this.attrs[0].dates.findIndex((date) => {
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

.space-between {
  display: flex;
  justify-content: space-between;
}

.space-between span.exceed {
  color: red;
}
</style>
