<template>
    <div class="page-content">
        <div class="page" v-html="page"> {{page}} </div>
    </div>
</template>

<script>
import {pageFilter} from '@/util.js'
export default {
    data(){
        return {page:' '}
    },
    mounted(){
        this.resolveDoc()
        window.scrollTo(0,0)
    },
    methods: {
      resolveDoc() {
          let recentUrl = '/repos/cxd/console3.0/docs/index'
          if(this.$route.params.id){
            recentUrl = '/repos/cxd/console3.0/docs/' + this.$route.params.id
          }
          this.$axios
            .get(recentUrl)
            .then(res=>{
              const resolvedPage = pageFilter(res.data.data.body_html)
              this.page = resolvedPage
            }) 
      }, 
    }
}
</script>

<style lang="stylus">
@import '../styl/page.styl';
.page-content
  margin-left 260px
  background-color #fff
  height 100%
  .page
    width 800px
    margin 40px auto 120px
    background-color #fff
    min-height 100%
</style>


