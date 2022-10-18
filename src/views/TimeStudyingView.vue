<template>
    <div>
        <h1 >{{ selection }}</h1>
        <h1 v-if="time<60">
            {{ time }} segundos
        </h1>
        <h1 v-else>
            {{ time/60 }} minutes
        </h1>
        <el-button @click="startMeasuring">Empezar a medir</el-button>
        <select-topic @listenTopic="getTopic($event)"></select-topic>
    </div>
</template>

<script>
import SelectTopic from '@/components/TopicComponent.vue'
//import axios from 'axios'
export default {
    name:"TimeStudyingView",
    components:{
        SelectTopic
    },
    data(){
        return {
            time:0,
            measure:false,
            selection:'',
        }
    },
    methods:{
        runTime(){
            setTimeout(()=>{
                
                if (this.measure){
                    console.log(this.measure)
                    this.runTime()
                    this.time++
                }
            }, 1000)
        },
        startMeasuring(){
            this.measure = !this.measure
            
            this.runTime()
            
        },
        getTopic(data){
            console.log('data')
            console.log(data.topics)
            data.topics.forEach(
                (item)=>{
                    console.log(item)
                    if(data.id==item.id)
                    this.selection = item.topic
                }
            )
        }
    },


}
</script>
