<template>
  <div class="docs">
    <sideBarNav/>
    <Page :key='this.$route.path'/>
  </div>
</template>

<script>
import sideBarNav from '@/components/sideBarNav.vue'
import Page from '@/components/Page.vue'
export default {
    components: {sideBarNav, Page}
}
</script>

<style lang="stylus">
.docs
  width 100%
  height 100%
</style>

