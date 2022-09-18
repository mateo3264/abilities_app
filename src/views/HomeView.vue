

<template>
  <div class="container">
    <h1>button-to-send-review branch</h1>
      
        <!-- <vue-flip v-model="token">
          <template v-slot:front>
            <img src="https://m.media-amazon.com/images/I/71dg9J4CtvL._AC_SX679_.jpg" alt="">
          </template>
          <template v-slot:back>
            <img src="https://m.media-amazon.com/images/I/71dg9J4CtvL._AC_SX679_.jpg" alt="">
            
          </template>
        </vue-flip> 
    -->

    
        <!-- "d.topic.id == '2' ?clase:else_clase"  -->
      <!-- <el-menu :unique-opened="true"> --> 


      
      
        <el-menu :unique-opened="onlyOneOpened">
          <el-submenu  :class="d.answers_set.length == 0?clase['red']:clase[d.topic.id]" :index="item.toString()" v-for="(d, item) in data" :key="item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/1200px-Lion_waiting_in_Namibia.jpg" width="250px" height="250px">
            <template slot="title"><el-icon class="el-icon-question"></el-icon>{{ item }} - {{d.ability}} - {{ d.topic.topic }} - {{d.n_times_reviewed}}</template>
              

              <el-menu-item-group v-for="(answer,sub_item) in d.answers_set" :key="sub_item">
                <el-menu-item  v-for="line, sub2item in answer.answer" :key=sub2item :index="sub_item.toString()">
                  <pre >{{ line }}</pre>
                </el-menu-item>
              <el-button @click="sendReview(d)">enviar enviar</el-button>
              <!-- <el-progress :percentage="Math.floor(Math.random()*100)"></el-progress> -->
              <el-slider v-model="dummySliderVar"></el-slider>
              </el-menu-item-group>
              
          </el-submenu>
        </el-menu>
        <div v-if="showInput">
        <el-input type="text" placeholder="Escribe la habilidad" v-model="ability" style="margin-top:20px">
        </el-input>
        <el-input type="textarea" :rows="5" placeholder="Escribe la respuesta" v-model="answer" style="margin-top:20px">
        </el-input>
        <el-select type="text" placeholder="Selecciona" v-model="selection" style="margin-top:20px">
          <el-option v-for="topic, item in topics" :label="topic.topic" :key="item" :value="topic.id"></el-option>
          
        </el-select>
        <el-button class="primary" @click="sendData">Enviar</el-button>
        </div>
        <div v-else>
          <h3>Por favor repasa x número de habilidades antes de introducir nuevas</h3>
        </div>
      
  



      <!-- <el-collapse v-model="activeName" accordion @change="onChange" >
        <el-collapse-item  :class="d.answers_set.length == 0?clase['red']:clase[d.topic.id]" :name="item.toString()" v-for="(d, item) in data" :key="item" :title="d.ability">
          <div  v-for="answer,subItem in d.answers_set" :key="subItem">
            
            <div  v-for="line, sub2Item in answer.answer" :key="sub2Item">
              <pre >
                {{ line }}
              </pre>
            </div>
            </div>
        </el-collapse-item>
      </el-collapse> -->
          <!-- <template slot="title"><el-icon class="el-icon-question"></el-icon>{{ item }} - {{d.ability}} - {{ d.topic.topic }}</template>
            <el-menu-item-group v-for="(answer,sub_item) in d.answers_set" :key="sub_item">
              <el-menu-item :index="sub_item.toString()"><pre>{{ answer.answer }}</pre></el-menu-item>
              <el-menu-item :index="sub_item.toString()">
                <ul>
                  <li v-for="line, sub2key in answer.answer" :key="sub2key">
                    {{ line }}
                  </li>

                </ul>
                </el-menu-item>
            </el-menu-item-group>
            
        </el-submenu>
      </el-menu> -->
  </div>
  
</template>

<script>
// @ is an alias to /src
//import VueFlip from 'vue-flip'
import axios from 'axios'
export default {
  name: 'HomeView',
  components: {
    //VueFlip
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
      showInput:false,
      MinimumAbilitiesReviewedPerDay:null,
      abilitiesReviewedToday:0,
      elementsReviewed:{},
      dummySliderVar:60,

      
      
    }
  },
  methods:{
    onChange(element){
      // console.log('algo cambió')
      // console.log('element')
      // console.log(element)
      // console.log('Mueche')
      this.data[element].n_times_reviewed += 1
      //if ()
      //this.abilitiesReviewedToday += 1
      
      // console.log(this.data[element].n_times_reviewed)
      //console.log(this.data[element])
      axios.post('http://127.0.0.1:8000/send/',this.data[element])
      .then(response=>{
        // console.log('respuseta after change')
        console.log(response)
        
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

      
    }
    
    // console.log('what is sent')
    // console.log(params)
      axios.post('http://127.0.0.1:8000/sendAbility/', params)
    .then(response=>{
      // console.log('response to sendAbility')
      console.log(response.data)
      this.ability = ''
      this.answer = ''
      this.selection = ''
    })
    },
    sendReview(element){
      console.log('abi, ans, sel')
      console.log(element)
    }
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
          
        console.log(count, el.answers_set[0].answer)
        console.log(count)
        el.answers_set[0].answer.forEach(it=>{
          console.log(it)
        })
        } catch(error){
             
          console.log(error)
        }
        count++
      })
      this.data = result.data
      console.log('this.$el')
      console.log(this.$el)
      // console.log(this.data)
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
    
  }
}
</script>

<style scoped>
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
