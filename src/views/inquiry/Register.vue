<template>
    <h3>문의 등록</h3>
    <div>
        <table>
            <tr>
                <th>고객 ID</th>
                <td><input type="text" v-model="customerId"/></td>
            </tr>
            <tr>
                <th>제목</th>
                <td><input type="text" v-model="title"/></td>
            </tr>
            <tr>
                <th>내용</th>
                <td><textarea type="text" v-model="content"/></td>
            </tr>
        </table>
        <br/>
        <button id="right" @click="fnRegister">등록</button>
        <br/>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                customerId: this.customerId,
                title : this.title,
                content : this.content,
                requestBody: {}
            }
        },
        methods: {
            fnRegister(){
                this.requestBody = {
                    customerId : this.customerId,
                    title : this.title,
                    content : this.content
                }
                this.$axios.post(this.$serverIP+'/inquiry/register',this.requestBody).then((res) => {
                    if(res.data){
                        this.$router.push({
                            path: '/inquiry/board',
                            query: {customerId: this.customerId}
                        })
                    }else{
                        alert('등록에 실패 하였습니다.')
                    }
                })
            }
        }
    }
</script>

<style scoped>
</style>