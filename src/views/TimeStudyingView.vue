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
import {mapState} from 'vuex'
import moment from 'moment'
//import axios from 'axios'
export default {
    name:"TimeStudyingView",
    components:{
        SelectTopic
    },
    data(){
        return {
            
            
            selection:'',
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
                const startTime = moment()//.minute()
                console.log('startTime')
                console.log(startTime)
                //console.log(typeof startTime)
            }else{
                console.log('moment() - startTime')
                //console.log(typeof Number(this.startTime))
                var now = moment()
                console.log('now')
                console.log(now)
                console.log(now.diff(this.startTime, 'minutes'))//.minute())
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
                    this.selection = item.topic
                }
            )
        }
    },


}
</script>
