<template>
    <div>
        <h1>Aquí van tus Metas Campeón! :D</h1>
        <!-- <el-tree :data="data"></el-tree> -->
        <v-chart :options="this.tree" class="gra"></v-chart>
        <el-button @click="shallowWoods">Retroceder en el Bosque</el-button>
        <el-button @click="deepWoods">Avanzar en el Bosque</el-button>
    </div>
    
</template>


<script>
import axios from 'axios'
import { use } from 'echarts/core'
import { TooltipComponent } from 'echarts/components'
import { TitleComponent } from 'echarts/components'
import { LegendComponent } from 'echarts/components'
import { GridComponent } from 'echarts/components'
import 'echarts/lib/chart/tree'

use([
    TooltipComponent,
    TitleComponent,
    LegendComponent,
    GridComponent
])
import ECharts from 'vue-echarts'
export default {
    name:'GoalView',
    components:{
        'v-chart':ECharts
    },
    methods:{
        deepWoods(){
            
            if (this.treeIdx == this.dataFromServer.length - 1) this.treeIdx = 0
            else  this.treeIdx++
            
            this.tree.series[0].data = [this.dataFromServer[this.treeIdx]]
        },
        shallowWoods(){
            if (this.treeIdx == 0) this.treeIdx= this.dataFromServer.length - 1
            else this.treeIdx--
            
            this.tree.series[0].data = [this.dataFromServer[this.treeIdx]]
        }
    },
    created(){
        axios.get('http://127.0.0.1:8000/get-goals/')
        .then(response=>{
            console.log('Data about goals')
            console.log(response)
            console.log(response.data)
            this.dataFromServer = response.data
            this.tree.series[0].data = [this.dataFromServer[this.treeIdx]]
            // this.tree2.series[1].data = [response.data[1]]
            console.log(this.data)
            //console.log(this.data.goal.replace("'",'"'))
            // console.log(typeof this.data.goal)
            // this.data = JSON.parse(JSON.stringify(this.data.goal))
            // console.log(this.data)
            //this.data = JSON.parse([this.data.goal])
            // console.log(JSON.parse(response.data))
            // console.log(typeof JSON.parse(response.data))
            // this.data = [JSON.parse(response.data)]
            // console.log(this.data)
            // console.log(response.data[0].goal)
            // console.log(typeof response.data[0].goal)
            // this.goals = JSON.parse(response.data[0].goal)
            //this.data = JSON.parse(this.goals)//this.goals[0].goal.slice(1, this.goals[0].goal.length - 1))
            // console.log('this.data')
            // console.log(this.goals[0].goal.slice(1, this.goals[0].goal.length - 1))
            // console.log(typeof(this.goals[0].goal))
        })
    },
    data(){
        return {
            treeIdx:0,
            goals:'',
            dataFromServer:null,
            data:[],
            tree:{
                tooltip:{
                    trigger:'item',
                    triggerOn:'mousemove',
                    formater:'{b}<br/>Info:{c}'
                },
                series:[
                    {
                        symbolSize:'20',
                        label:{
                            position:'left',
                            fontSize:9
                        },
                        type:'tree',
                        name:'tree',
                        data:[

                        ]
                    },
                    
                ]
            },
            
        }
    }
}
</script>
<style scoped>
.gra{
    width:100%;
}
</style>