<template>
  <div id="app">
    <h1>This is an about page</h1>
    <AboutComponent/>
  </div>
</template>

<script>
import AboutComponent from '@/components/AboutComponent.vue'

export default {
  name:'AboutView',
  components:{
    AboutComponent
  },
  mounted(){
    console.log('current location url')
    console.log(window.location.href)

  }
}
</script>

<style scoped>
#app{
  height:500px;
}
</style>