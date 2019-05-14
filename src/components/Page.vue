<template>
    <div class="page-content">
        <div class="page" v-html="page"> {{page}} </div>
        <preNext/>
        <div class="nav" v-if="nav.length > 1">
          <div v-for="item in nav" :key="item.name">
            <h2 v-if="item.lv === 'h2'">
              <router-link :to="item.link">{{item.name}}</router-link>
            </h2>
            <h3 v-if="item.lv === 'h3'">
              <router-link :to="item.link">- {{item.name}}</router-link>
            </h3>
          </div>
        </div>
    </div>
</template>

<script>
import preNext from './preNext.vue'
import {pageFilter} from '@/util.js'
export default {
    components:{preNext},
    data(){
        return {
          page:' ',
          nav:''
        }
    },
    mounted(){
        this.resolveDoc()
        window.scrollTo(0,0)
        window.addEventListener('scroll',this.handleScroll)
    },
    updated(){  
        this.scrollToRencentHash('center')  
    },
    // hash 变化的时候自动变动页面位置
    watch:{
      $route(to,from){
        if(to.path === from.path){
          this.scrollToRencentHash('start')
        }
      },
    },
    methods: {
      handleScroll(e){
        let hash = ""
        this.nav.forEach(
          (item)=>{
            const myObj = document.getElementById(item.name)
            const top = myObj.getBoundingClientRect().top //元素顶端到可见区域顶端的距离
            const se = document.documentElement.clientHeight //浏览器可见区域高度。
            if(0 <= top <= 10) {
              console.log(item.name,'进来了',top)
            }
          }
        )
      },
      scrollToRencentHash(position) {
        if (decodeURIComponent(window.location.hash)) {
          let hash = decodeURIComponent(window.location.hash).split('#')[1]
          document.getElementById(hash).scrollIntoView(
            {
              behavior: "smooth",
              block: position,
            }
          ) 
        }      
      },
      resolveDoc() {
          let recentUrl = '/repos/cxd/tob/docs/index'
          if(this.$route.params.id){
            recentUrl = '/repos/cxd/tob/docs/' + this.$route.params.id
          }
          this.$axios
            .get(recentUrl)
            .then(res=>{
              const resolvedPage = pageFilter(res.data.data)
              this.page = resolvedPage.filteredPage
              this.nav = resolvedPage.nav
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
  overflow hidden
  position relative
  .page
    width 700px
    margin 40px 0 40px 120px
    background-color #fff
    min-height 100%
</style>


