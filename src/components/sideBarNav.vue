<template>
    <div class="side-bar">
      <div class="logo">
          <router-link to="/docs/index">
              <img src="http://baiduyun-guideline.bj.bcebos.com/public/cxd%C2%B7guide.svg" alt="">
          </router-link>
      </div>
      <div class="scroll-content">
        <div v-for="item in this.$store.state.toc" :key="item.title" class="nav-level-0">
            <!-- 一级导航 -->
            <div class="nav-content" v-if="shouldShow(item.publish)">
                <!-- 文章链接 -->
                <router-link :to="item.url" v-if="item.type === 'DOC'">
                    {{item.title}}
                </router-link>
                <!-- 未创建的文章链接 -->
                <router-link v-if="shouldShowUncreat() && item.type === 'UNCREATED_DOC'" :to="item.url">
                    {{item.title}}
                </router-link>
                <!-- 组 -->
                <div class="group canClose" v-if="item.type === 'TITLE'" @click="toggleOpen(item)">
                    <div class="arr"><div class="arr-item" :class="[item.open? 'open' : '']"></div></div>
                    {{item.title}}
                </div>
                    <!-- 二级导航 -->
                    <div  class="nav-level-1" v-if="item.children[1] && item.open">
                      <div v-for="item1 in item.children" :key="item1.title">
                        <div class="nav-content" v-if="shouldShow(item1.publish)">
                            <router-link :to="item1.url" v-if="item1.type === 'DOC'">
                                {{item1.title}}
                            </router-link>
                            <!-- 未创建的文章链接 -->
                            <router-link v-if="shouldShowUncreat() && item1.type === 'UNCREATED_DOC'" :to="item1.url">
                                {{item1.title}}
                            </router-link>
                            <div class="group" v-if="item1.type === 'TITLE'">
                                {{item1.title}}
                            </div>
                            <!-- 三级导航 -->
                            <div class="nav-level-2" v-if="item1.children[1]">
                              <div v-for="item2 in item1.children" :key="item2.title">
                                <div class="nav-content" v-if="shouldShow(item2.publish)">
                                    <router-link :to="item2.url" v-if="item2.type === 'DOC'">
                                        {{item2.title}}   
                                    </router-link>  
                                    <!-- 未创建的文章链接 -->
                                    <router-link v-if="shouldShowUncreat() && item2.type === 'UNCREATED_DOC'" :to="item2.url">
                                        {{item2.title}}
                                    </router-link>
                               </div>                         
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
            </div>
        </div>
      </div>
    </div>
</template>

<style lang="stylus">
.side-bar
  position fixed
  top 0
  left 0
  width 260px
  height 100%
  background-color #f5f5f5
  overflow hidden
  .logo
    z-index 2
    position absolute
    top 0
    left 0
    width 240px
    height 60px
    background-color #f5f5f5
    a
      padding 0
      margin 0
      overflow hidden
      width 100%
      height 60px
      &:hover
        background-color transparent
    img 
      height 20px
      margin 24px 18px
  .scroll-content
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    padding 68px 8px 12px 8px
    overflow scroll
  a,.group
    border 1px solid rgba(0,0,0,0)
    color rgba(0,0,0,.8)
    text-decoration-line none
    display block
    width 100%
    font-size 14px
    height 36px
    line-height 34px
    box-sizing border-box
    padding 0 0 0 24px
    transition .2s all ease-in-out
    position relative
    &.router-link-active
      font-weight 900
    .arr
      position absolute
      width 14px
      height 14px
      top 48%
      left 8px
      transform translateY(-50%)
      .arr-item
        width 0
        height 0
        margin 3px
        border-width 4px 0 4px 6px
        border-style solid
        border-color transparent transparent transparent #000
        position relative
        transition .2s all ease-in-out  
        &.open
          transform rotate(90deg)
  a:hover, .canClose:hover
    background-color  rgba(0,0,0,.1)
    cursor pointer
  .nav-level-1
    padding 4px 0 4px 18px
    a,.group
      height 32px
      line-height 30px
      font-size 14px
      padding 0 0 0 12px
    .group
      color rgba(0,0,0,.4)
      font-size 14px
  .nav-level-2
    padding 4px 0 12px 0
    a,.group
      height 32px
      line-height 32px
      font-size 14px     
</style>

<script>
export default {
    updated(){  
        this.scrollToRencentLink()  
    },
    methods: {
        scrollToRencentLink(){
            document.getElementsByClassName('router-link-active')[0].scrollIntoView(
                {
                    behavior: "smooth",
                    block:    "center",
                }
            )

        },
        shouldShow(isPublish) {
            if(this.$route.path.indexOf('test/docs')>-1){
                return true
            } else {
                return isPublish
            }
        },
        shouldShowUncreat() {
            if(this.$route.path.indexOf('test/docs')>-1){
                return true
            } else {
                return false
            }            
        },
        toggleOpen(item) {
            item.open = !item.open
        }
    }
}
</script>


