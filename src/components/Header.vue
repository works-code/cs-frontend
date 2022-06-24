<template>
    <header>
        <h1>고객 문의 접수 및 답변 기능 구현</h1>
        <div id="nav">
            <router-link to="/inquiry/board">고객 사용 페이지 바로 가기</router-link> |
            <router-link to="/counselor/board">상담사 사용 페이지 바로 가기</router-link>
        </div>
    </header>
    <hr/>
</template>

<script>
    export default {
        data(){
            return {
                username : this.$cookies.get("username")
            }
        }
    }
</script>

<style scoped>

</style>