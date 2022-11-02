<template>
    <div>
        <h1 >{{ selection[0] }}</h1>
        <h1 v-if="time<60">
            {{ time }} segundos
        </h1>
        <h1 v-else>
            {{ time/60 }} minutes
        </h1>
        <el-button @click="startMeasuring">Empezar a medir</el-button>
        <select-topic @listenTopic="getTopic($event)"></select-topic>
        <el-input type="textarea" placeholder="Añade una descripción" v-model="description"></el-input>
        <el-tooltip content="Enviar tiempo estudiado">
            <el-button @click="sendTimeStudied">Enviar</el-button>
        </el-tooltip>
    </div>
</template>

<script>
import SelectTopic from '@/components/TopicComponent.vue'
import {mapState} from 'vuex'
import moment from 'moment'
import axios from 'axios'

export default {
    name:"TimeStudyingView",
    components:{
        SelectTopic
    },
    data(){
        return {
            
            
            selection:[],
            startTime:null,
            total_time_studying_topic:0,
            topicId:null,
            description:'',
            
        }
    },
    computed:{
        ...mapState(['time', 'measure']),
        time:{
            get(){
                return this.$store.state.time
            },
            set(){
                this.$store.commit('updateTime')
            }
        },
        measure:{
            get(){
                return this.$store.state.measure
            },
            set(){
                this.$store.commit('updateMeasure')
            }
        }
    },
    methods:{
        runTime(){
            setTimeout(()=>{
                
                if (this.$store.state.measure){
                    
                    this.runTime()
                    this.time++
                }
            }, 1000)
        },
        startMeasuring(){
            //this.measure = !this.measure
            console.log("moment().subtract(10, 'days').calendar()")
            
            this.$store.commit('updateMeasure')
            console.log(this.$store.state.measure)
            if (this.$store.state.measure){
                this.startTime = moment()//.minute()
                console.log('startTime')
                console.log(this.startTime)
                //console.log(typeof startTime)
            }else{
                console.log('moment() - startTime')
                //console.log(typeof Number(this.startTime))
                var now = moment()
                console.log('now')
                console.log(now)
                console.log('this.startTime')
                console.log(this.startTime)
                this.total_time_studying_topic += now.diff(this.startTime, 'seconds')
                console.log(this.total_time_studying_topic)//.minute())
                this.startTime = now 
            }

            this.runTime()
            
        },
        getTopic(data){
            console.log('data')
            console.log(data.topics)
            data.topics.forEach(
                (item)=>{
                    console.log(item)
                    if(data.id==item.id)
                    this.selection.push(item.id)//topic
                    //this.topicId = item.id
                }
            )
        },
        sendTimeStudied(){
            const minutes_studied = this.total_time_studying_topic/60
            console.log(`Dummy: Abi Studied: ${this.selection} \n Time Studied: ${minutes_studied}`)
            axios.post('http://127.0.0.1:8000/add-time-studied-topic/',{
                
                    topics:this.selection,
                    time_in_minutes:minutes_studied,
                    description:this.description
                
            })
            .then(response=>{
                console.log(response)
            })
        }
    },


}
</script>
