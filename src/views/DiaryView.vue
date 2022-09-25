<template>
    <div class="block">
        <el-timeline direction="horizontal" reverse=true>
            <el-timeline-item v-for="(item, k) in diaryData" :key="k" :timestamp="item.created_at" placement="top" size="normal">
                <el-card class="card">
                    <h4>{{item.created_at}}</h4>
                    <p>{{item.description}}</p>
                </el-card>
            </el-timeline-item>
            <!-- <el-timeline-item timestamp="2022/9/10" placement="top" size="normal">
                <el-card class="card">
                    <h4>Cómo</h4>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, optio?</p>
                </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2022/9/5" placement="top" size="normal">
                <el-card class="card">
                    <h4>Estás</h4>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, optio?</p>
                </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2022/9/1" placement="top" size="normal">
                <el-card class="card">
                    <h4>?</h4>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi, optio?</p>
                </el-card>
            </el-timeline-item> -->

        </el-timeline>

    </div>
</template>
<script>
import axios from 'axios'

export default {
    name:'DiaryView',
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
    }

}

</script>

<style scoped>
.card{
    width:500px;
}
.el-timeline-item__timestamp{
    margin-left:10px;
}
</style>