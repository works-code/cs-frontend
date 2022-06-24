# cs-frontend

## 프로젝트 구성
Vue3
### 구조
- asserts : CSS, 이미지 저장하는 디렉토리
- component : router 에서 보여주지 않는 컴포넌트
- views : router 에서 보여주는 컴포넌트
- router : router 관련 설정
- App.vue : 최상위 컴포넌트
- main.js : 가장 먼저 실행 되는 javascript 파일

### 사용 기술
vue 3
- 쿠키
> vue-cookies
- Http 통신 
> axios
- router (특정 주소 접근시 원하는 컴포넌트 표기)
> vue-router
## 실행 방법
### 사전 작업
#### vue-cookies 모듈 설치
```
npm install --save vue-cookies 
```
#### axios 모듈 설치
```
npm install --save axios
```
#### vue-router 모듈 설치
```
npm install --save vue-router
```
#### 어플리케이션 실행
```
npm run serve
```
#### 데이터 조회 및 처리를 위해 API 서버 기동
- [API 서버 GIT](https://github.com/works-code/cs-backend)
### 어플리케이션 이용 방법
#### 1. [메인 페이지](http://localhost:8081) 접속
#### 2. 고객, 상담사 사용 페이지 접속
#### - 고객 사용 페이지
- 경로 : 상단 '고객 사용 페이지 바로가기' 클릭
- 조회 : 고객 ID 입력하여 조회 (불필요한 조회 방지)
- 등록 : 등록 버튼 클릭하여 문의글 등록 (로그인 없이 가능)
- 답변 확인 : 상담사가 답변 등록시 확인을 원하는 고객 ID 조회후 '답변 확인' 열에서 확인 버튼 클릭하여 확인 가능
#### - 상담사 사용 페이지
- 경로 : 상단 '상담사 사용 페이지 바로가기' 클릭
- 로그인 : 로그인 필수 사항 (계정이 없다면 원하는 ID/PW 입력후 회원 가입 버튼 클릭 > 로그인 후 이용)
- 로그아웃 : 로그아웃시 로그인 페이지로 랜딩 (기존에 이용하던 상담사 페이지 접근시 로그인 페이지로 랜딩 처리)
- 미답변 문의글 조회 : 로그인시 보여지는 페이지로 미답변 문의글 확인 가능 (10초마다 갱신되며 답변된 문의는 항목에서 제외)
- 상담사 지정 : 상담사 열의 '지정' 버튼을 통해 지정 가능하여 상담사 지정후 답변 가능 (이미 등록된 상담사가 있다면 alert 으로 안내되며 이미 상담사가 지정된 문의글은 '지정' 버튼 비활성화)
- 답변 등록 : 타인이 상담사로 지정한 글은 답변 불가능하며, 상담사 ID 열에 '지정' 버튼 클릭시 답변 열에 '답변' 버튼 활성화
## 문제 해결 전략
### 고객 사용 페이지
- 조회
> 고객 사용 페이지 접속시 모든 데이터를 조회 하지 않고, 원하는 고객 ID를 입력 해야 조회 가능하도록 하여 불 필요한 데이터 조회를 하지 않아 DB 부하를 줄였습니다.
> 한 페이지에 모든 리스트를 보여줄시 불편함이 있어 최대 5개의 문의글을 볼 수 있도록 페이징 처리하였습니다.
- 등록
> 등록 완료시 고객의 편리함을 위해 고객 ID를 넘겨 등록한 문의를 따로 조회 하지 않아도 볼 수 있도록 하였습니다.
- 답변 확인
> 문의글 목록에서 바로 답변이 추가 됐는지 확인 할 수 있도록 답변이 추가된 문의글만 답변 확인 버튼을 활성화 하였습니다.
### 상담사 사용 페이지
- 로그인, 회원가입
> 회원인 유저만 로그인 가능하도록 하였으며 쿠키를 이용하여 기능 구현 하였습니다.
> 로그인 완료시 쿠키에 회원 아이디를 저장하였으며 로그아웃시 쿠키에서 제거 하였습니다.
- 미답변 문의글 조회
> interval 기능을 이용하여 10초마다 미답변 문의글이 갱신 되도록 하였습니다.
```js
this.interval = setInterval(this.fnGetList, 10000)
```
> 해당 기능은 페이지 벗이났을시에도 동작 하므로 벗어났을시 갱신 작업을 하지 않도록 하기 위해 아래와 같이 처리 하였습니다.
```js
beforeRouteLeave (to, from, next) {
            clearInterval(this.interval)
            next()
        }
```
- 상담사 지정
> 이미 상담사 지정된 글일시 API 서버에서 false로 응답이 오며, false 일시 alert 을 통해 안내 하도록 하였습니다.
```js
this.$axios.post(this.$serverIP+'/inquiry/set/counselor',this.requestBody
                ).then((res) => {
                    if (res.data == false){
                        alert("이미 담당자가 지정된 문의건이거나 서버 이슈로 실패 하였습니다.");
                        return false;
                    }
                    this.fnGetList()
                })
```
- 답변
> 상담사 ID 에 지정된 상담사 ID 정보가 있고 본인 ID 와 동일할시 답변 버튼을 활성화 하도록 하였습니다.
```html
<td v-if="counselorId == username">
    <button @click="fnRegister(seq)"> 작성 </button>
</td>

<td v-else-if="counselorId == null">
    상담사 지정후 가능
</td>

<td v-else>
    작성 불가능
</td>
```