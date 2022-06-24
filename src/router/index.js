import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home'
import InquiryBoard from '@/views/inquiry/Board'
import InquiryRegister from '@/views/inquiry/Register'
import InquiryAnswerInfo from '@/views/inquiry/AnswerInfo'
import CounselorBoard from '@/views/counselor/Board'
import CounselorRegister from '@/views/counselor/Register'
import CounselorLogin from '@/views/counselor/Login'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    { // inquiry
        path: '/inquiry/board',
        name: 'inquiryBoard',
        component: InquiryBoard
    },
    {
        path: '/inquiry/register',
        name: 'inquiryRegister',
        component: InquiryRegister
    },
    {
        path: '/inquiry/answer/:seq',
        name: 'inquiryAnswer',
        component: InquiryAnswerInfo
    },
    { //answer
        path: '/counselor/board',
        name: 'counselorBoard',
        component: CounselorBoard
    },
    {
        path: '/counselor/register/:seq',
        name: 'counselorRegister',
        component: CounselorRegister
    },
    {
        path: '/counselor/login',
        name: 'counselorLogin',
        component: CounselorLogin
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router