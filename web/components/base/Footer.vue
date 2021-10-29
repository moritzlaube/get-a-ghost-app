<template lang="pug">
  footer
    .container.center-align
      a(href='/privacy') Privacy Statement
      p.footer__subline
        | Made with ❤️ by Dots &amp; Dashes &copy; {{ new Date().getFullYear() }}
      
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss" scoped>
footer {
  margin-top: 3rem;
}

.footer__subline {
  font-size: var(--text-xs);
  color: var(--text-light);
}
</style>
