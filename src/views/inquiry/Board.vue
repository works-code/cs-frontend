<template>
    <h3>문의글 조회</h3> <p id="info">(등록한 문의는 서버 성능에 따라 순차적으로 등록 되어 등록한 문의가 조회 되지 않는다면 조금만 기다렸다가 조회해주세요!)</p>
    <div>
        고객 ID <input type="text" v-model="customerId"/>
        <button @click="fnGetList">조회</button>
        <button id="right" @click="fnRegister">등록</button>
    </div>
    <br/>
    <table>
        <thead>
        <tr>
            <th>No</th>
            <th>제목</th>
            <th>내용</th>
            <th>고객 ID</th>
            <th>생성일</th>
            <th>답변확인</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="this.list.length > 0" v-for="({customerId,title,content,createDate,answerSeq}, idx) in paginatedData" :key="idx">
            <td>{{idx+1}}</td>
            <td>{{title}}</td>
            <td>{{content}}</td>
            <td>{{customerId}}</td>
            <td>{{createDate}}</td>
            <td v-if="answerSeq != null">
                <router-link to="">
                    <button @click="fnView(customerId, answerSeq)">바로가기</button>
                </router-link>
            </td>
            <td v-else>답변미완료</td>
        </tr>
        <tr v-else>
            <td colspan="6">데이터가 없습니다.</td>
        </tr>
        </tbody>
    </table>
    <div class="btn-cover" v-show="this.list.length > 0">
        <button :disabled="pageNum === 0" @click="fnPrevPage" class="page-btn">
            이전
        </button>
        <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
        <button :disabled="pageNum >= pageCount - 1" @click="fnNextPage" class="page-btn">
            다음
        </button>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                customerId: this.customerId,
                answerSeq : this.answerSeq,
                requestBody: {},
                list: [],
                pageNum: 0, // 페이지 번호,
                pageSize: 5 // 페이지 내 데이터 길이
            }
        },
        created() {
            this.customerId = this.$route.query.customerId
            if (this.customerId != null){
                this.fnGetList()
            }
        },
        methods: {
            fnGetList() {
                if(this.customerId == ''){
                    alert("고객 ID 입력후 조회 해주세요.");
                    return false;
                }
                this.$axios.get(this.$serverIP+'/inquiry/get/'+this.customerId).then((res) => {
                    this.list = res.data
                })
            },
            fnView(customerId, seq){
                this.requestBody.customerId = customerId
                this.$router.push({
                    path: '/inquiry/answer/'+seq,
                    query: this.requestBody
                })
            },
            fnRegister(){
                this.$router.push({
                    path: '/inquiry/register'
                })
            },
            fnNextPage () {
                this.pageNum += 1;
            },
            fnPrevPage () {
                this.pageNum -= 1;
            }
        },
        computed: {
            pageCount () {
                let listLeng = this.list.length,
                    listSize = this.pageSize,
                    page = Math.floor(listLeng / listSize);
                if (listLeng % listSize > 0) page += 1;
                return page;
            },
            paginatedData () {
                const start = this.pageNum * this.pageSize,
                    end = start + this.pageSize;
                return this.list.slice(start, end);
            }
        }
    }
</script>

<style scoped>
    table {
        width: 100%;
        border: 1px solid black;
        border-collapse: collapse;
    }
    th, td {
        border: 1px solid black;
    }
</style>