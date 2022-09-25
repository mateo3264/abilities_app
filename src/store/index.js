import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  
  state: {
    ability:'',
    answer:'',
    data:null,
    sliderDifficultyEdit:5,
    item:null,
    diaryData:null,
  },
  getters: {
  },
  mutations: {
    
      updateAbility(state, payload) {
        state.ability = payload
      },
      updateAnswer(state, payload) {
        state.answer = payload
      },
      updateData(state, payload){
        state.data = payload
      },
      updateSliderDifficultyEdit(state, payload){
        state.sliderDifficultyEdit = payload
      },
      updateDiaryData(state, payload){
        state.diaryData = payload
      },
    
  },
  actions: {
    onChange(state, obj){
      console.log('vuex: queeee????')
      console.log(this.state.data)

      console.log('obj')
      console.log(obj)
      console.log('typeof(obj.item)')
      console.log(typeof(obj.item))

      
      if(!obj.edit){
        console.log('pq?')
        console.log('this.state.data[obj.item]')
        console.log(this.state.data[obj.item])
        this.state.data[obj.item].n_times_reviewed += 1
      }else{

        this.state.data[obj.item].ability = this.state.ability
        this.state.data[obj.item].answers_set[0].answer = [this.state.answer]
      }
      console.log('this.data[element]')
      console.log(this.state.data[obj.item])
      console.log('element')
      console.log(obj.item)
      console.log('sliderDifficultyEdit')
      console.log(this.state.sliderDifficultyEdit)
      this.state.data[obj.item].difficulty = this.state.sliderDifficultyEdit
      
      console.log('this.data[element]')
      console.log(this.state.data[obj.item])
      axios.post('http://127.0.0.1:8000/send/',this.state.data[obj.item])
      .then(response=>{
        console.log('actions response')
        console.log(response)
        this.state.sliderDifficultyEdit = 5
        this.state.ability = ''
        this.state.answer = ''

      })
    }
  },
  modules: {
  }
})
