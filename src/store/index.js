import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  
  state: {
    ability:'',
    answer:'',
    answerCorrectness:5,
    data:[],
    sliderDifficultyEdit:5,
    item:null,
    diaryData:null,
    abilitiesAddedToday:0,
    abilitiesReviewedToday:0,
    showReviewAbilityVar:false,
    time:0,
    measure:false
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
      updateAnswerCorrectness(state, payload){
        state.answerCorrectness = payload
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
      updateAbilitiesAddedToday(state){
        state.abilitiesAddedToday++
      },
      updateAbilitiesReviewedToday(state){
        state.abilitiesReviewedToday++
      },
      updateTime(state){
        state.time++
      },
      updateMeasure(state){
        state.measure = !state.measure
      },
      showReinforcerForReviewing(){
        this.$notify(
          {
            title:'Refuerzo',
            message:'Nice, repasaste 1 habilidad'
          }
        )
  
      },
      updateShowReviewAbilityVar(state){
        state.showReviewAbilityVar = !state.showReviewAbilityVar
      }
      
    
  },
  actions: {
    onChange(state, obj){
      // console.log('vuex: queeee????')
      // console.log(this.state.data)

      // console.log('obj')
      // console.log(obj)
      // console.log('typeof(obj.item)')
      // console.log(typeof(obj.item))

      
      if(!obj.edit){
        // console.log('pq?')
        // console.log('this.state.data[obj.item]')
        // console.log(this.state.data[obj.item])
        //this.state.data[obj.item].n_times_reviewed += 1
        this.state.data[obj.item].answer_correctness = this.state.answerCorrectness
      }else{

        this.state.data[obj.item].ability = this.state.ability
        this.state.data[obj.item].answers_set[0].answer = [this.state.answer]
      }
      // console.log('this.data[element]')
      // console.log(this.state.data[obj.item])
      // console.log('element')
      // console.log(obj.item)
      // console.log('sliderDifficultyEdit')
      // console.log(this.state.sliderDifficultyEdit)
      this.state.data[obj.item].difficulty = this.state.sliderDifficultyEdit
      
      // console.log('this.data[element]')
      // console.log(this.state.data[obj.item])
      axios.post('http://127.0.0.1:8000/send/',this.state.data[obj.item])
      .then(response=>{
        console.log('actions response')
        console.log(response)
        this.state.abilitiesReviewedToday++
        // this.state.data = this.state.data.filter((item, i)=> {  
        //   i!==obj.item
        // })
        let newData = []
        for(let i=0; i<this.state.data.length;i++){
          if(i!==obj.item)newData.push(this.state.data[i])
        }
        this.state.data = newData;
        this.state.showReviewAbilityVar = false
        console.log('this.state.data.length')
        console.log(this.state.data.length)
        
        //this.$store.showReinforcerForReviewing()

      })
      console.log('1/Math.log(this.state.abilitiesReviewedToday/6 + 3)')
        const r = Math.random()
        const p = 1/Math.log(this.state.abilitiesReviewedToday/15 + 3)
        console.log(p)
        console.log(r >= p)
        if (r >= p && this.state.data.length < 100){
          console.log('TRUE')
          axios.get(`http://127.0.0.1:8000/?probability_scheduled_query=${p}`)
          .then(
            response =>{
              response.data.forEach(obj=>{
                this.state.data.push(obj)
                // console.log('obj')
                // console.log(obj)
                obj.answers_set[0].answer = obj.answers_set[0].answer.split('\n')
              })
              console.log('Adición de habilidades random')
            }
          )
        }
      this.state.sliderDifficultyEdit = 5
      this.state.ability = ''
      this.state.answer = ''
      this.state.answerCorrectness = 5
    }
  },
  modules: {
  }
})
