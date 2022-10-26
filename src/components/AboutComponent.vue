<template>
  <div id="principal">
    <el-row>
      <el-col :span="12">

        <el-card>
          <div class="appp" @mouseover="saySomething">
            <v-chart :options="line" />

          </div>
        </el-card>
      </el-col>
    <el-col :span="12">

      <el-card>
        <div class="appp">

          <v-chart :options="line2" />
        </div>
      </el-card>
    </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-card>
        <div class="radar appp">

          <v-chart :options="radar"/>
        </div>
      </el-card>
      <el-card>
        <div class="line666">
          <v-chart :options="line666"></v-chart>
        </div>
      </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style>
/**
 * The default size is 600px×400px, for responsive charts
 * you may need to set percentage values as follows (also
 * don't forget to provide a size for the container).
 */
 .appp{
  width:100%;
  height:500px;
 }
.radar{
  width:100%;
  height:900px ;
 } 
.echarts {
  width: 100%;
  height: 100%;
}

.line666{
  width:100%;
  height:500px;
}
</style>

<script>
import axios from 'axios';
import ECharts from "vue-echarts";
import { TitleComponent } from 'echarts/components';
import { TooltipComponent } from 'echarts/components';
import { LegendComponent } from 'echarts/components';
import { GridComponent } from 'echarts/components';
//import {CanvasRenderer} from 'echarts/renderers';
import {use} from 'echarts/core';
import "echarts/lib/chart/pie";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/radar";

import moment from 'moment';
use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  //CanvasRenderer
])

export default {
  components: {
    "v-chart": ECharts,
  },
  methods:{

    getAbilitiesByDay(){

      axios.get('http://127.0.0.1:8000/metrics/abilities-by-day/')
        .then(response=>{
          console.log('total-abilities response')
          this.metric = response.data['metric']
          //this.bar.series[0].data = [this.metric],
          //var sum_total_abilities_by_day = 0
          this.metric.forEach(item =>{
            //TODO: Verify this code is correct
            if(item['created_at__date']>'2022-08-16'){
              console.log("momento momento")
              var hoy = moment()
              console.log(moment(item['created_at__date']).format('YYYY-MM-DD'))
              console.log(hoy.subtract(4, 'days').format('YYYY-MM-DD'))
              //console.log(hoy.subtract(4, 'days').format('YYYY-MM-DD').length)
              //console.log(typeof(hoy.subtract(4, 'days').format('YYYY-MM-DD')))
              //console.log(item['created_at__date'])
              //console.log(item['created_at__date'].length)
              //console.log(typeof(item['created_at__date']))
              console.log(hoy.subtract(4, 'days').format('YYYY-MM-DD')===moment(item['created_at__date']).format('YYYY-MM-DD'))
              
              this.line.series[0].data.push({
                name:item['created_at__date'], 
                value:item['dcount'], 
                
                })
        
              //sum_total_abilities_by_day += item['dcount']
            //this.line.series[1].data.push({'name':item['created_at__date'], 'value':sum_total_abilities_by_day})
            this.line.xAxis.data.push(item['created_at__date'])
            }
          })
          console.log(this.metric)
        })
    },
    abilitiesReviewedByDay(){
      axios.get('http://127.0.0.1:8000/metrics/abilities-reviewed-by-day/')
      .then(response=>{
        console.log('abilities-reviewed-by-day response')
        //console.log(moment().format('YYYY-MM-DD'))
        //console.log(typeof(moment().format('YYYY-MM-DD')))
        const today = moment().format('YYYY-MM-DD')
        this.metric = response.data['metric']
        //this.bar.series[0].data = [this.metric],
        //console.log(this.metric)
        //var sum_total_abilities_by_day = 0
        this.metric.forEach(item =>{
          //TODO: Verify this code is correct
          if(item['updated_at__date']>'2022-08-26'){
            
            this.line2.series[0].data.push({'name':item['upated_at__date'], 'value':item['dcount']})

            //sum_total_abilities_by_day += item['dcount']
          //this.line.series[1].data.push({'name':item['updated_at__date'], 'value':sum_total_abilities_by_day})
          
          if (today === item['updated_at__date']){
            console.log('today')
            console.log(item.updated_at__date)
            console.log(item.dcount)
          }
          this.line2.xAxis.data.push(item['updated_at__date'])
          }
        })
        console.log(this.metric)
        console.log(this.line2.series[0].data)
        
        console.log(this.line2.xAxis.data)
        console.log("this.line2.xAxis.data[this.line2.xAxis.data.length - 1] === moment().format('YYYY-MM-DD')")
        console.log(this.line2.xAxis.data[this.line2.xAxis.data.length - 1] === today)
        
      })
    
    },
    getAllTopics(){
      axios.get('http://127.0.0.1:8000/topics/')
      .then(response=>{
        response.data.forEach(el=>{
          this.topics_id_and_names.push(el)
          
          
        })
        console.log('this.topics_id_and_names')
        console.log(this.topics_id_and_names)
      })
    },
    abilitiesReviewedByTopic(){
      axios.get('http://127.0.0.1:8000/abilities-by-topic/')
      .then(response=>{
        console.log('abilities-by-topic response')
        console.log(response.data)
        var topic_names = []
        response.data.forEach(el=>{
          //let topic_name = this.topic_names
          //console.log('el')
          //console.log(el)
          this.topic_list.push(el.n_abilities_by_topic)
          // Object.entries(this.topics_id_and_names).map(topic=>{
          
          //console.log(el.topic)
          // this.topics_id_and_names.forEach(obj=>{
          //nombre = this.topics_id_and_names.some(obj=>{
          var nombre = ''
          this.topics_id_and_names.forEach(obj=>{
            //console.log('queso')
            //console.log(el)
            //console.log(obj)
            if (el.topic === Number(obj.id)){
              // console.log('el y topic')
              // console.log(el)
              // console.log(obj)
              
              nombre = obj.topic
              // console.log('nombre in')
              // console.log(obj.topic)
              }
            
          })
          //console.log('nombre')
          //console.log(nombre)
          //const name = this.topics_id_and_names
          topic_names.push({name:nombre, max:100})
          
        })
        // console.log('topic_names')
        // console.log(topic_names)
        this.topic_list.push(1)
        console.log('this.topic_list')
        console.log(this.topic_list)
        this.dataBJ = [this.topic_list,]
        console.log(this.dataBJ)
        this.radar.series[0].data.push({value:this.topic_list})//this.dataBJ//this.dataBJ
        //this.radar.series[0].data.push(this.dataBJ)
        this.radar.radar.indicator = topic_names
        this.radar.series[0].lineStyle = this.lineStyle
        
        //console.log(moment().format('YYYY-MM-DD'))
        //console.log(typeof(moment().format('YYYY-MM-DD')))

        //var sum_total_abilities_by_day = 0
        
        //console.log('this.radar.series[0].data')
        //console.log(this.radar.series[0].data)
        
        //console.log(this.line2.xAxis.data)
        //this.radar.series[0].data = this.response.data.n_abilities_by_topic
        //this.radar.series[0].lineStyle = this.lineStyle
        //console.log("this.line2.xAxis.data[this.line2.xAxis.data.length - 1] === moment().format('YYYY-MM-DD')")
        //console.log(this.line2.xAxis.data[this.line2.xAxis.data.length - 1] === today)
        
      })
    
    },
    saySomething(){
      console.log('here')
    },
    metaDiaria(){
      this.line666.series[0].data = [1, 15, 45, 135]
    }
  },

  mounted(){
      this.getAbilitiesByDay()
      this.abilitiesReviewedByDay()
      this.getAllTopics()
      this.abilitiesReviewedByTopic()
      this.metaDiaria()
      //this.radar.series[0].data = this.dataBJ
      //this.radar.series[0].lineStyle = this.lineStyle
      // axios.get('http://127.0.0.1:8000/metrics/abilities-by-day/')
      // .then(response=>{
      //   console.log('total-abilities response')
      //   this.metric = response.data['metric']
      //   //this.bar.series[0].data = [this.metric],
      //   var sum_total_abilities_by_day = 0
      //   this.metric.forEach(item =>{
      //     //TODO: Verify this code is correct
      //     if(item['created_at__date']>'2022-08-16'){
      //       this.line.series[0].data.push({'name':item['created_at__date'], 'value':item['dcount']})

      //       sum_total_abilities_by_day += item['dcount']
      //     this.line.series[1].data.push({'name':item['created_at__date'], 'value':sum_total_abilities_by_day})
      //     this.line.xAxis.data.push(item['created_at__date'])
      //     }
      //   })
      //   console.log(this.metric)
      // })
      
  },
  data() {
    return {
      metric:0,
      dataBJ : [],
      topic_list : [],
      topics_id_and_names:[],
      // [[267, 216, 280, 0, 108, 64, 9],
      // ],
      lineStyle : {
        width: 1,
        opacity: 0.9
      },
      pie: {
        title: {
          text: "Hola",
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["uno", "dos", "tres", "cuatro", "cinco"],
        },
        series: [
          {
            name: "nombre",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            
            data: [
              { value: 335, name: "one" },
              { value: 310, name: "two" },
              { value: 234, name: "three" },
              { value: 135, name: "four" },
              { value: 1548, name: "five" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    line: {
        title: {
          text: "Hola",
          x: "center",
        },
        xAxis:{
          type: 'category',
          //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          data:[],

        },
        yAxis:{
          type:'value'
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}",
        },
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        //   data: ["uno", "dos", "tres", "cuatro", "cinco"],
        // },
        series: [
          {
            name: "nombre",
            type: "line",
            // radius: "55%",
            // center: ["50%", "60%"],
            data: [
              //  12,
            //  3, 
            //  5,
            //  15,
            //  7,
            //  9,
            //  8
            
            ],
            color:'green',
            areaStyle: {
              opacity:'0.2',
              color:'green'
            },
            
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
          {
            type:'line',
            data:[],
            areaStyle:{},
          }
        ],
      },
    line2: {
        title: {
          text: "Hola",
          x: "center",
        },
        xAxis:{
          type: 'category',
          //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          data:[],

        },
        yAxis:{
          type:'value'
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}",
        },
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        //   data: ["uno", "dos", "tres", "cuatro", "cinco"],
        // },
        series: [
          {
            name: "nombre",
            type: "line",
            // radius: "55%",
            // center: ["50%", "60%"],
            data: [
              //  12,
            //  3, 
            //  5,
            //  15,
            //  7,
            //  9,
            //  8
            
            ],
            areaStyle:{},
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
          {
            type:'line',
            data:[],
            areaStyle:{},
          }
        ],
      },
    line666:{
      xAxis:{
        type:'category'
      },
      yAxis:{
        type:'value'
      },
      series:[
        {
          type:'line',
          data:[]
        }
      ]
    },
    bar: {
        title: {
          text: "Hola",
          x: "center",
        },
        xAxis:{
          type: 'category',
          data: ['Mon']

        },
        yAxis:{
          type:'value'
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        //   data: ["uno", "dos", "tres", "cuatro", "cinco"],
        // },
        series: [
          {
            name: "nombre",
            type: "bar",
            // radius: "55%",
            // center: ["50%", "60%"],
            data: [
             0
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    radar:
       {
        tooltip: {
          trigger: 'axis'
        },
        backgroundColor: '#161627',
        title: {
          text: 'Mateo Abilities',
          left: 'center',
          textStyle: {
            color: '#eee'
          }
        },
        legend: {
          bottom: 5,
          data: ['Mi radar de habilidades'],
          itemGap: 20,
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          selectedMode: 'single'
        },
        
        radar: {
          
          indicator: [
            // { name: 'Política', max: 300 },
            // { name: 'Economía', max: 250 },
            // { name: 'Matemáticas', max: 300 },
            // { name: 'Idiomas', max: 5 },
            // { name: 'Ciencias de la Conducta', max: 200 },
            // { name: 'Epica', max: 100 }
          ],
          
          shape: 'circle',
          splitNumber: 5,
          axisName: {
            color: 'rgb(238, 197, 102)'
          },
          
          splitLine: {
            lineStyle: {
              color: [
                'rgba(238, 197, 102, 0.1)',
                'rgba(238, 197, 102, 0.2)',
                'rgba(238, 197, 102, 0.4)',
                'rgba(238, 197, 102, 0.6)',
                'rgba(238, 197, 102, 0.8)',
                'rgba(238, 197, 102, 1)'
              ].reverse()
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
            color: 'rgba(238, 197, 102, 0.5)'
          }
          }
        },
        series: [
          {
            name: 'Beijing',
            type: 'radar',
            tooltip:{
              trigger:'item',
              formatter:'{c}'
            },
            data: [],
            lineStyle: [],
            symbol: 'none',
            itemStyle: {
              color: '#F9713C'
            },
            areaStyle: {
              opacity: 0.1
            }
          },
          
        ]
      }

    };
  },
};
</script>