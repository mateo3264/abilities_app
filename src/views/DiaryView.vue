<template>
    <div class="block" >
        <el-timeline direction="horizontal" reverse=true>
            <el-timeline-item v-for="(item, k) in diaryData" :key="k"  placement="top" size="normal">
                <el-card class="card">
                    <h4>{{item.created_at}}</h4>
                    <p>{{item.description}}</p>
                </el-card>
            </el-timeline-item>


        </el-timeline>
        
        <div>
            <el-input type="textarea" v-model="diaryDescription" placeholder="Escribe en tu diario :)"></el-input>
            <el-button @click="sendDiary">Enviar Descripción</el-button>
        </div>

    </div>
    
</template>
<script>
import axios from 'axios'

export default {
    name:'DiaryView',
    data(){
        return {
            diaryDescription:''
        }
    },
    created(){
        axios.get('http://127.0.0.1:8000/diary/')
        .then(response=>{
            console.log('response')
            this.diaryData = response.data
            console.log(this.diaryData)
        })
    },
    computed:{
        diaryData:{
            get(){
                return this.$store.state.diaryData
            },
            set(value){
                this.$store.commit('updateDiaryData', value)
            }
        }
    },
    methods:{
        sendDiary(){
            const params = {
                description:this.diaryDescription
            }
            axios.post('http://127.0.0.1:8000/post-in-diary/', params)
            .then(response=>{
                console.log(response)
            })
        }
    }

}

</script>

<style scoped>
.el-timeline{
    height:70vh;
    overflow:auto;
}
.card{
    width:500px;
}
.el-timeline-item__timestamp{
    margin-left:10px;
}

</style>