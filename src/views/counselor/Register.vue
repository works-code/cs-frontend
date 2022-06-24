<template>
    <h3>답변 상세</h3>
    <div>
        <button id="right" @click="fnRegister">등록</button>
        <button id="right" @click="fnMoveBoard">목록</button>
        <table>
            <tr>
                <th>상담자명</th>
                <td><input type="text" v-model="counselorName"/></td>
            </tr>
            <tr>
                <th>내용</th>
                <td><textarea type="text" v-model="content"/></td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                username: this.$cookies.get("username"),
                counselorName : this.counselorName,
                content : this.content,
                requestBody: {}
            }
        },
        created() {
            if (this.username == null){
                this.$router.push({
                    path: '/counselor/login'
                })
                return false;
            }
        },
        methods: {
            fnRegister() {
                this.requestBody = {
                    inquirySeq: this.$route.params.seq,
                    counselorId: this.username,
                    counselorName: this.counselorName,
                    content: this.content
                }
                this.$axios.post(this.$serverIP+'/answer/register', this.requestBody).then((res) => {
                    if(res.data == true){
                        this.fnMoveBoard()
                    }else{
                        alert("답변 등록이 이미 등록 되었거나 서버 문제로 실패하였습니다.")
                        return false;
                    }
                })
            },
            fnMoveBoard(){
                this.$router.push({
                    path: '/counselor/board'
                })
            }
        }
    }
</script>

<style scoped>

</style>