<template>
    <div>
        <h1>Aquí van tus Metas Campeón! :D</h1>
        <el-tree :data="data"></el-tree>
    </div>
    
</template>


<script>
import axios from 'axios'

export default {
    name:'GoalView',
    created(){
        axios.get('http://127.0.0.1:8000/get-goals/')
        .then(response=>{
            console.log('Data about goals')
            console.log(response)
            console.log(response.data)
            this.data = response.data
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
            goals:'',
            data:[]
        }
    }
}
</script>