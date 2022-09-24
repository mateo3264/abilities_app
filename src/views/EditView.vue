<template>
        <div v-if="true">
          <h3>Responder intraverbalmente</h3>

          <el-input type="text" placeholder="Escribe la habilidad" v-model="ability" style="margin-top:20px">
          </el-input>
          <el-input type="textarea" :rows="5" placeholder="Escribe la respuesta" v-model="answer" style="margin-top:20px">
          </el-input>
          <el-button @click="onChange({item:item, edit:true})">Enviar Edición de Habilidad</el-button>
        
        </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name:'EditPage',
        data(){
            return {
                

                
            }
        },
        computed:{
            ...mapState(['item']),
            ability:{
                get(){
                    return this.$store.state.ability
                },
                set(value){
                    this.$store.commit('updateAbility', value)
                }
            },
            answer:{
                get(){
                    return this.$store.state.answer
                },
                set(value){
                    this.$store.commit('updateAnswer', value)
                }
            }
        },
        methods:{
            ...mapActions(['onChange'])
        }
     

    }
</script>