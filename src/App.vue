<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {resolveYaml} from '@/util.js'
export default {
  mounted() {
      const url = '/repos/cxd/console3.0'
      this.$axios
        .get(url)
        .then(res=>{
          this.$store.state.toc = resolveYaml(res.data.data.toc_yml)
      }) 
      if (this.$route.path === '/'){
        this.$router.push("/docs")
      }
  }
}
</script>

<style lang="stylus">
html,body,#app
  margin 0
  border 0
  width 100%
  height 100%
  font-family: Avenir, "PingFang SC", "SF Pro SC","SF Pro Text","Helvetica Neue",  Helvetica,  Roboto, 'Arial','microsoft yahei ui',"Microsoft YaHei",SimSun, sans-serif;
  -moz-osx-font-smoothing: grayscale;  
  -webkit-font-smoothing: antialiased; 
  font-weight normal
  font-size 14px
</style>

