<template>
    <h3>답변 상세</h3>
    <div>
        <button id="right" @click="fnMoveBoard">목록</button>
        <table>
            <tr>
                <th>상담사명</th>
                <td>{{result.counselorName}}</td>
            </tr>
            <tr>
                <th>답변일자</th>
                <td>{{result.createDate}}</td>
            </tr>
            <tr>
                <th>내용</th>
                <td>{{result.content}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                requestBody: {},
                result: {}
            }
        },
        created() {
            this.requestBody.customerId = this.$route.query.customerId
            this.fnGetList()
        },
        methods: {
            fnGetList() {
                this.$axios.get(this.$serverIP+'/answer/get/'+this.$route.params.seq).then((res) => {
                    this.result = res.data
                })
            },
            fnMoveBoard(){
                this.$router.push({
                    path: '/inquiry/board',
                    query: this.requestBody
                })
            }
        }
    }
</script>

<style scoped>

</style>