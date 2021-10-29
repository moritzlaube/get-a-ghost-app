<template>
  <div>
    <BaseHeader />
    <Nuxt />
    <notifications classes="vue-notification" position="top left" />
    <BaseFooter />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
