

<template>
  <div class="container"> 
        <el-menu :unique-opened="onlyOneOpened">
          <el-submenu  :class="d.answers_set.length == 0?clase['red']:clase[d.topic.id]" :index="item.toString()" v-for="(d, item) in data" :key="item">
            <template slot="title"><el-icon class="el-icon-question"></el-icon>{{ item }} - {{d.ability}} - {{ d.topic.topic }} - {{d.n_times_reviewed}} - {{ d.difficulty }} - {{ d.type.type }}</template>
              
            <div v-if="d.type.type == types_of_abilities[0]">

              <el-menu-item-group v-for="(answer,sub_item) in d.answers_set" :key="sub_item">
                <el-menu-item  v-for="line, sub2item in answer.answer" :key=sub2item :index="sub_item.toString()">
                  <pre >{{ line }}</pre>
                </el-menu-item>
              <el-slider show-stops v-model="sliderDifficultyEdit" :min="minDifficulty" :max="maxDifficulty"></el-slider>
              <el-button @click="onChange(item)">Enviar Repaso de Habilidad</el-button>
              </el-menu-item-group>
            </div>
            <div v-else-if="d.type.type == types_of_abilities[1]">
              <el-image :src="d.ability" fit="scale-down"></el-image>
              <el-menu>
                <el-submenu>
                  <template slot="title"><el-icon class="el-icon-question"></el-icon>Respuesta:</template>
                  {{d.answers_set[0].answer[0]}}
                </el-submenu>
                
                <el-slider show-stops v-model="sliderDifficultyEdit" :min="minDifficulty" :max="maxDifficulty"></el-slider>
                <el-button @click="onChange(item)">Enviar Repaso de Habilidad</el-button>
              </el-menu>

            </div>
              
          </el-submenu>
        </el-menu>
        <div v-if="showInput == 0">
          <h3>Responder intraverbalmente</h3>
          <el-input type="text" placeholder="Escribe la habilidad" v-model="ability" style="margin-top:20px">
          </el-input>
          <el-input type="textarea" :rows="5" placeholder="Escribe la respuesta" v-model="answer" style="margin-top:20px">
          </el-input>
        
        </div>
        <div v-else-if="showInput == 1">
          <h3>Tactear Imagen</h3>
          <el-input placeholder="Escribe la url de la imagen" type="url" v-model="url">
            <template slot="prepend">URL:</template>
          </el-input>
          <el-input type="text" placeholder="Escribe la respuesta verbal a condicionar"></el-input>
        </div>
        <div>

          <el-select multiple filterable type="text" placeholder="Selecciona" v-model="selection" style="margin-top:20px">
            <el-option v-for="topic, item in topics" :label="topic.topic" :key="item" :value="topic.id"></el-option>
            
          </el-select>
        <el-button class="primary" @click="sendData">Enviar</el-button>
        </div>
        
        <el-button-group>
          <el-button @click="decrementShowInput" icon="el-icon-arrow-left">{{ this.types_of_abilities[showInput - 1]}}</el-button>
          <el-button  @click="incrementShowInput">{{ this.types_of_abilities[showInput + 1]}}<i class="el-icon-arrow-right"></i></el-button>
        </el-button-group>
  </div>
  
</template>

<script>
// @ is an alias to /src
//import VueFlip from 'vue-flip'
//import AboutComponent from '@/components/AboutComponent'
import axios from 'axios'
export default {
  name: 'HomeView',
  components: {
    //VueFlip
    // 'about-component':AboutComponent
  },
  data(){
    return{
      data:null,
      activeName:'1',
      clase:{
        1:'otro',
        2:'aws',
        3:'math',
        4:'internet',
        5:'k8s',
        6:'statistics',
        'red':'red',
      },
      onlyOneOpened:true,
      ability:'',
      answer:'',
      selection:'',
      topics:[],
      topics_list:[],
      token:true,
      showInput:0,
      MinimumAbilitiesReviewedPerDay:null,
      abilitiesReviewedToday:0,
      elementsReviewed:{},
      sliderDifficultyEdit:5,
      sliderDifficulty:5,
      minDifficulty:0,
      maxDifficulty:10,
      types_of_abilities:[],

      
      
    }
  },
  methods:{
    decrementShowInput(){
      if (this.showInput > 0) this.showInput--
    },
    incrementShowInput(){
      if (this.showInput < this.types_of_abilities.length - 1) this.showInput++
    },
    onChange(element){
      // console.log('algo cambió')
      // console.log('element')
      // console.log(element)
      // console.log('Mueche')
      this.data[element].n_times_reviewed += 1
      //if ()
      //this.abilitiesReviewedToday += 1
      console.log('this.data[element]')
      console.log(this.data[element])
      console.log('element')
      console.log(element)
      console.log('sliderDifficultyEdit')
      console.log(this.sliderDifficultyEdit)
      this.data[element].difficulty = this.sliderDifficultyEdit
      console.log('this.data[element]')
      console.log(this.data[element])
      // console.log(this.data[element].n_times_reviewed)
      //console.log(this.data[element])
      axios.post('http://127.0.0.1:8000/send/',this.data[element])
      .then(response=>{
        // console.log('respuseta after change')
        console.log(response)
        this.sliderDifficultyEdit = 5
        
        //TODO: colocarlo al inicio de todo
        if (this.abilitiesReviewedToday >= this.MinimumAbilitiesReviewedPerDay){
        this.showInput = true
      }
      })
    },
    sendData(){
      const params = {
      ability:this.ability,
      answer:this.answer,
      selection:this.selection,
      difficulty:this.sliderDifficulty

      
    }
    
    console.log('what is sent')
    console.log(params)
      axios.post('http://127.0.0.1:8000/sendAbility/', params)
    .then(response=>{
      // console.log('response to sendAbility')
      console.log(response.data)
      this.ability = ''
      this.answer = ''
      this.selection = ''
    })
    },
  },
  mounted(){
    axios.get('http://127.0.0.1:8000/abilities-reviewed-today/')
    .then(response=>{  
      this.abilitiesReviewedToday = response.data.n_reviewed_abilities_today 
      // console.log('this.abilitiesReviewedToday')
      // console.log(this.abilitiesReviewedToday)
      }
    )
    if (this.abilitiesReviewedToday >= this.MinimumAbilitiesReviewedPerDay){
        this.showInput = true
    }
    // console.log('current page url')
    // console.log(window.location.href)
    axios.get('http://127.0.0.1:8000/')
    .then(result=>{
      var count = 0
      result.data.forEach(el =>{
        
      //   // console.log('****************************************')
      //   // console.log(el)
      //   // console.log('****************************************')
        
        try{
          if (count >= 0 ){

            el.answers_set[0].answer = el.answers_set[0].answer.split('\n')
            if (!this.topics_list.includes(el.topic.topic)){
              this.topics_list.push(el.topic.topic)
              this.topics.push({topic:el.topic.topic, id:el.topic.id})
            }
          }
          

        // el.answers_set[0].answer.forEach(it=>{
        //   console.log(it)
        // })
        } catch(error){
             
          console.log(error)
        }
        count++
      })
      this.data = result.data

      console.log('this.data')
      console.log(this.data)
      // console.log('this.topics')
      // console.log(this.topics)
    })
    axios.get('http://127.0.0.1:8000/topics/')
    .then(response=>{
      response.data.forEach(el=>{
        this.topics.push(el)
        this.topics_list.push(el.topic)
        // console.log(el)
      })
      // console.log('this.topics')
      // console.log(this.topics)
    })
    axios.get('http://127.0.0.1:8000/minimum-number-of-abilities-reviewed-today/')
    .then(response=>{
      // console.log('MinimumAbilitiesReviewedPerDay')
      // console.log(response.data)
      this.MinimumAbilitiesReviewedPerDay = response.data.minimum_abilities_reviewed_per_day
      // console.log(this.MinimumAbilitiesReviewedPerDay)
    })

    axios.get('http://127.0.0.1:8000/types-of-abilities')
    .then(response =>{
      response.data.forEach(item=>{
        this.types_of_abilities.push(item.type)
      })
      
      console.log('types of abilities')
      console.log(this.types_of_abilities)
    })
    
  }
}
</script>

<style scoped>
img{
  width:700px;
  display:block;
  margin-left:auto;
  margin-right:auto;
  width:50%;
  
}
ul{
  height:400px;
  overflow:auto;
}
.el-submenu{
  cursor:pointer;
  text-align: left;
}
.otro{
  background-color: rgba(0, 0, 0, 0.1);
}
.aws{
  background-color: rgba(250,120,0, 0.1)
}
.math{
  background-color: rgba(220, 0, 200, 0.1);
}
.internet{
  background-color: rgba(0, 220, 0, 0.1);
}
.k8s{
  background-color: rgba(0, 0, 220, 0.1);
}
.statistics{
  background-color: rgba(172, 220, 0, 0.1);
}
.red{
  background-color: rgba(255, 0, 0, 0.2);
}

pre{
  text-align: left;
}
::-webkit-scrollbar{
  border-radius: 5px;
}
::-webkit-scrollbar-track{
  
  background-color: white;
  
  
}
::-webkit-scrollbar-thumb{
  
  background-color: grey;
  border-radius:5px;
  height:15%;
  
  
}

img{
  
  margin-left:40%;
}
</style>
