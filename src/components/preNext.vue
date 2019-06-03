<template>
    <div class="pre-next">
        <div class="pre" v-if="pre">
            <router-link :to="pre.url">
                ← {{pre.title}}
            </router-link>
        </div>
        <div class="next" v-if="next">
            <router-link :to="next.url">
                {{next.title}} →
            </router-link>
        </div>
    </div>
</template>

<style lang="stylus">
.pre-next
  width 800px
  margin 0px 0 80px 120px
  background-color #fff
  overflow hidden
  .pre
    float left
  .next
    float right
  a
    text-decoration-line none
    font-size 16px
</style>

<script>
import { setTimeout } from 'timers';
export default {
    data(){
        return {
            data: '',
            pre: undefined,
            next: undefined
        }
    },
    mounted(){
        this.resolvePreNext()
    },
    methods:{
        resolvePreNext(){
            setTimeout(()=>{
                this.data = this.$store.state.navFlat
                const index = this.contains(this.data,this.$route.path)
                if (index > 0) {
                    this.pre = this.data[index - 1]
                }
                if (index < this.data.length-1) {
                    this.next = this.data[index + 1]
                }
            },1000)
        },
        contains(a,obj) { 
            var i = a.length; 
            while (i--) { if (a[i].url === obj) { return i; } } 
            return false; 
            }
    }
}
</script>


