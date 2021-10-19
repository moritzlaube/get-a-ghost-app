<template lang="pug">
  div.container
    h1 Edit Profile
    //- div
    //-   span Select your profession
    //-   BaseSelect(label="What's your field of expertise?" placeholder="Select ..." :id="'profession'" tabindex="0" :options="['Ghostwriter', 'Moodscout', 'Both']" v-model="form.profession")
    //- div(v-if="form.profession && form.profession === 'Ghostwriter'")
    //-   span Select your language
    //-   BaseSelect(label="Select your language" placeholder="Select ..." :id="'language'" tabindex="0" :options="languages" v-model="form.language")
    //- div
    //-   span Website (optional)
    //-   BaseInput(type="text" id="website" name="website" v-model="form.website" placeholder="www.example.com" label="Website")
    //- div
    //-   span About (english)
    //-   BaseTextarea(id="about" name="about" v-model="form.about" rows="5" cols="33" placeholder="About You")
    //- div
    //-   span Timezone
    //-   BaseSelect(label="Select your timezone" placeholder="Select ..." :id="'timezone'" tabindex="0" :options="timezones" v-model="form.timezone")
    //- v-date-picker(:value="null" color="pink" v-model="selectedDates" :model-config="modelConfig" :attributes="attrs" locale="en" is-dark is-range is-expanded @input="handleDatePicker" @dayclick="handleDelete")
</template>

<script>
export default {
  name: 'ProfilePage',
  middleware: ({ redirect, store }) => {
    if (!store.state.auth.user.isGhost) redirect('/')
  },
}
</script>
