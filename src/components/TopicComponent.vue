<template>
    <el-select multiple filterable type="text" placeholder="Selecciona" v-model="selection" @change="$emit('listenTopic', {id:selection, topics:topics})" style="margin-top:20px">
        <el-option  v-for="topic, item in topics" :label="topic.topic" :key="item" :value="topic.id"></el-option>        
    </el-select>
</template>


<script>
import axios from 'axios'
export default {
    name:'TopicComponent',
    data(){
        return {
            selection:'',
            topics:[],
            topics_list:[],
        }
    },
    mounted(){
            axios.get('http://127.0.0.1:8000/topics/')
    .then(result=>{
      result.data.forEach(el =>{
        console.log('el.answers_set[0].answer')
        console.log(el)
        
      

            //el.answers_set[0].answer = el.answers_set[0].answer.split('\n')
            //if (!this.topics_list.includes(el.topic.topic)){
              //this.topics_list.push(el.topic.topic)
              this.topics.push({topic:el.topic, id:el.id})
           // }
        
      })
      this.data = result.data

      console.log('this.data')
      console.log(this.data)
      // console.log('this.topics')
      // console.log(this.topics)
    })
    }
}
</script>
