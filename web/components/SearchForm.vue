<template lang="pug">
  div.container.flow
    p Find all the availabe Ghosts for a given timeframe. If your dates are flexible, please check the appropriate box.
    form(@submit.prevent="onSubmit" :class="{ loading: isLoading }").flow
      div
        p Find me a ...
        BaseSelect(label="Find Ghostwriter or Moodscout" placeholder="Select a profession ..." :id="'profession'" tabindex="0" :options="['Ghostwriter', 'Moodscout', 'All-in-1']" @input="handleSelect")

      div(v-if="form.profession === 'Ghostwriter' || form.profession === 'All-in-1'")
        p writing in ...
        BaseSelect(label="Select a language" placeholder="Select a language" :id="'language'" tabindex="0" :options="['English', 'German', 'French']" @input="handleSelect")
    
      client-only
        div
          p available on ...
          v-date-picker(v-model="form.dateRange" :model-config="modelConfig" mode="date" color="pink" is-dark is-range)
            template(v-slot="{ inputValue, inputEvents, isDragging }")
              .date-range
                div
                  BaseInput(:value="inputValue.start" v-on="inputEvents.start" placeholder="Start Date" :icon="true")
                    template(#icon)
                      svg(fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor")
                        path(d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z")
                .date-range__arrow
                  svg(viewBox="0 0 24 24" stroke="currentColor" width="18" height="18")
                    path(stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3")
                div
                  BaseInput(:value="inputValue.end" v-on="inputEvents.end" placeholder="End Date" :icon="true")
                    template(#icon)
                      svg(fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor")
                        path(d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z")
      div
          p Choose your preferred category
          BaseSelect(label="Choose your category" placeholder="Choose a category (optional)" id="category" tabindex="0" :options="['None', 'People', 'Cars', 'Table-top', 'Slice-of-Life']" @input="handleSelect")
      BaseButton(type="submit" :disabled="!(form.dateRange.start && form.profession)").btn-mt.has-shadow GO FIND!
</template>

<script>
export default {
  name: 'SearchForm',
  data() {
    return {
      isLoading: false,
      form: {
        profession: null,
        language: null,
        category: null,
        dateRange: {
          start: null,
          end: null,
        },
      },
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
    }
  },

  methods: {
    handleSelect(payload) {
      Object.assign(this.form, payload)
      if (this.form.profession === 'Moodscout' && this.form.language !== null)
        this.form.language = null
    },
    onSubmit() {
      this.loading = true

      const SHORTCODES = {
        english: 'en',
        german: 'de',
        french: 'fr',
      }

      const queryModel = {
        type: this.form.profession?.toLowerCase(),
        language: SHORTCODES[this.form.language?.toLowerCase()] || null,
        category: this.form.category?.toLowerCase() || null,
        startDate: this.form.dateRange.start?.toISOString(),
        endDate: this.form.dateRange.end?.toISOString(),
      }

      const query = new URLSearchParams(
        Object.keys(queryModel)
          .filter((k) => queryModel[k] != null)
          .reduce((a, k) => ({ ...a, [k]: queryModel[k] }), {})
      )

      this.$router.push('/ghosts?' + query)
    },
  },
}
</script>

<style lang="scss" scoped>
.date-range {
  display: flex;
  align-items: center;
}

.date-range__arrow {
  display: flex;
  padding: var(--space-sm);
  color: (--var-text-light);
}

.btn-mt {
  margin-top: var(--space-xxl) !important;
}
</style>

<style lang="scss">
.vc-container.vc-is-dark {
  background-color: var(--bg-dark-grey) !important;
  border-color: var(--mid-grey);
}
</style>
