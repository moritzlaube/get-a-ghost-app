<template lang="pug">
  footer
    .container.flow
      div.footer-split
        NuxtLink(to="/privacy") Privacy Statement
        NuxtLink(to="/terms-and-conditions") Terms &amp; Conditions
      p.footer__subline.center-align
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
  color: var(--text-mid-grey);
}

.footer-split {
  display: flex;
  max-width: 35ch;
  justify-content: space-between;
  margin: 0 auto;
}
</style>
