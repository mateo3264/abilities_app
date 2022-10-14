<template>
  <div id="app">
    <nav >
      <router-link to="/" >Home</router-link> |
      <router-link v-if="addedGraphsPage" to="/graphs">Graph</router-link> <span v-if="false"> |</span>
      <router-link to="/diary">Diary</router-link> |
      <router-link to="/goals">Goals</router-link>
      
      
    </nav>
    <router-view @listenToAbilityAdditions="addOneAbility"/>
  </div>
</template>
<script>
export default{
  name:'AppView',
  data(){
    return{
      //Try to reinforce through styles
      addedGraphsPage:true,
      abilitiesAdeddToday:0
    }
  },
  methods:{
    stylesOrNotStyles(){
      console.log('this.abilitiesAdeddToday')
      console.log(this.abilitiesAdeddToday)
      if (this.abilitiesAdeddToday>=Math.ceil(Math.random()*0)) require('element-ui/lib/theme-chalk/index.css')
    },
    addOneAbility(){
      this.abilitiesAdeddToday++
      this.stylesOrNotStyles()
    }
  },
  mounted(){
    this.stylesOrNotStyles()
  }

  }

</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
