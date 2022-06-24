<template>
    <h3>로그인</h3>
    <div>
        <button id="right" @click="fnLogin">로그인</button>
        <button id="right" @click="fnJoin">회원가입(아래 입력한 ID/PW)</button>
        <table>
            <tr>
                <th>ID</th>
                <td><input type="text" v-model="username"/></td>
            </tr>
            <tr>
                <th>PW</th>
                <td><input type="password" v-model="password"/></td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                username : this.username,
                password : this.password,
                requestBody : {}
            }
        },
        methods:{
            fnLogin(){
                if(!this.fnVaildCheck()){
                    return false;
                }
                this.requestBody = {
                    username : this.username,
                    password : this.password
                }
                this.$axios.post(this.$serverIP+'/user/login',this.requestBody).then((res)=> {
                    if(res.data){
                        this.$cookies.set("username", this.username);
                        this.$router.push({
                            path: '/counselor/board'
                        })
                    }else{
                        alert("로그인에 실패 하였습니다.");
                    }
                })
            },
            fnJoin(){
                if(!this.fnVaildCheck()){
                    return false;
                }
                this.requestBody = {
                    username : this.username,
                    password : this.password
                }
                this.$axios.post(this.$serverIP+'/user/join',this.requestBody).then((res)=> {
                    if(res.data){
                        alert("회원가입 완료 되었습니다! 로그인 진행 해주세요.")
                    }else{
                        alert("회원가입이 불가능합니다.(존재하는 회원이거나 서비스에 문제가 있습니다.)");
                    }
                })
            },
            fnVaildCheck(){
                if (this.username == null || this.password == null){
                    alert("ID/PW 모두 입력해주세요!")
                    return false;
                }
                return true;
            }
        }
    }
</script>

<style scoped>

</style>