<template lang="pug">
  div.container.flow
    BaseBackButton(@click="$router.go(-1)") New Search
    GhostsList
</template>

<script>
export default {
  name: 'SearchResultsPage',
  auth: false,
}
</script>
