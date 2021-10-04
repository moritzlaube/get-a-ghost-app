<template lang="pug">
  div
    h1 Ghost ID {{ $route.params.ghostId }}
    code {{ $route.hash }}
</template>

<script>
export default {}
</script>
