<template>
    <h3>미답변 문의글 조회</h3>
    <p>{{username}} 님 안녕하세요</p>
    <p id="info">(상담사 지정 작업의 경우 서버 성능에 따라 요청 순서대로 처리 되어 변경 되지 않았다면 조금만 기다려주세요!)<br/>
    (만약 먼저 요청한 상담사가 있다면 우선적으로 요청한 상담사로 지정 되오니 참고 바랍니다.)</p>
    <button @click="fnLogout">로그아웃</button>
    <br/>
    <table>
        <thead>
        <tr>
            <th>No</th>
            <th>고객 ID</th>
            <th>제목</th>
            <th>내용</th>
            <th>생성일</th>
            <th>상담사 ID</th>
            <th>답변</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="this.list.length > 0" v-for="({seq,customerId,title,content,createDate,counselorId}, idx) in paginatedData" :key="idx">
            <td>{{idx+1}}</td>
            <td>{{customerId}}</td>
            <td>{{title}}</td>
            <td>{{content}}</td>
            <td>{{createDate}}</td>
            <td v-if="counselorId != null">{{counselorId}}</td>
            <td v-else>
                <button @click="fnPick(seq)">지정</button>
            </td>
            <td v-if="counselorId == username">
                <button @click="fnRegister(seq)">작성</button>
            </td>
            <td v-else-if="counselorId == null">
                상담사 지정후 가능
            </td>
            <td v-else>작성불가능</td>
        </tr>
        <tr v-else>
            <td colspan="7">데이터가 없습니다.</td>
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
                username: this.$cookies.get("username"),
                customerId: this.customerId,
                answerSeq : this.answerSeq,
                requestBody: {},
                interval: {},
                list: [],
                pageNum: 0, // 페이지 번호,
                pageSize: 5 // 페이지 내 데이터 길이
            }
        },
        created() {
            if (this.username == null){
                this.$router.push({
                    path: '/counselor/login'
                })
                return false;
            }
            this.fnGetList()
            this.interval = setInterval(this.fnGetList, 10000)
        },
        beforeRouteLeave (to, from, next) {
            clearInterval(this.interval)
            next()
        },
        methods: {
            fnGetList() {
                this.$axios.get(this.$serverIP+'/inquiry/get/noAnswer').then((res) => {
                    this.list = res.data
                })
            },
            fnPick(seq){
                this.requestBody.inquirySeq = seq
                this.requestBody.counselorId = this.username
                this.$axios.post(this.$serverIP+'/inquiry/set/counselor',this.requestBody
                ).then((res) => {
                    if (res.data == false){
                        alert("이미 담당자가 지정된 문의건이거나 서버 이슈로 실패 하였습니다.");
                        return false;
                    }
                    this.fnGetList()
                })
            },
            fnRegister(seq){
                this.$router.push({
                    path: '/counselor/register/'+seq
                })
            },
            fnLogout(){
                this.$cookies.remove("username");
                this.$router.push({
                    path: '/counselor/login'
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