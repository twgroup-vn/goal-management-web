import auth from '../middleware/auth'
import noAuth from '../middleware/noAuth'

export const routes = [
    {
        path: '/', name: 'login', component: () => import('../views/login.vue'), display: 'Đăng nhập', beforeEnter: noAuth
    },
    {
        path: '/checkIn', name: 'checkIn', component: () => import('../views/checkIn.vue'), display: 'Tiến độ', beforeEnter: auth
    },
    {
        path: '/checkInCompany', name: 'checkInCompany', component: () => import('../views/checkInCompany.vue'), display: 'Tiến độ công ty', beforeEnter: auth
    },
    {
        path: '/conversation', name: 'conversation', component: () => import('../views/conversation.vue'), display: 'Hội thoại', beforeEnter: auth
    },
    {
        path: '/board', name: 'board', component: () => import('../views/board.vue'), display: 'Quản lý công việc', beforeEnter: auth
    },
    {
        path: '/boardDetail/:id', name: 'boardDetail', component: () => import('../views/boardDetail.vue'), display: 'Chi tiết quản lý công việc', beforeEnter: auth
    },
    {
        path: '/createCompany', name: 'createCompany', component: () => import('../views/createCompany.vue'), display: 'Tạo công ty', beforeEnter: noAuth
    },
    {
        path: '/userInfo', name: 'userInfo', component: () => import('../views/userInfo.vue'), display: 'Thông tin tài khoản'
    },
    {
        path: '/login', name: 'login', component: () => import('../views/login.vue'), display: 'Đăng nhập', beforeEnter: noAuth
    },
    
    /* Admin */
    {
        path: '/admin/dashboard', name: 'dashboardAdmin', component: () => import('../views/dashboardAdmin.vue'), display: 'Bảng điều khiển', beforeEnter: auth
    },
    {
        path: '/admin/company', name: 'companyAdmin', component: () => import('../views/companyAdmin.vue'), display: 'Thông tin công ty', beforeEnter: auth
    },
    {
        path: '/admin/question', name: 'checkInQuestionAdmin', component: () => import('../views/checkInQuestionAdmin.vue'), display: 'Câu hỏi check in', beforeEnter: auth
    },
    {
        path: '/admin/cycle', name: 'cycleAdmin', component: () => import('../views/cycleAdmin.vue'), display: 'Quản lý chu kỳ', beforeEnter: auth
    },
    {
        path: '/admin/department', name: 'departmentAdmin', component: () => import('../views/departmentAdmin.vue'), display: 'Quản lý phòng ban', beforeEnter: auth
    },
    {
        path: '/admin/position', name: 'positionAdmin', component: () => import('../views/positionAdmin.vue'), display: 'Quản lý vị trí công việc', beforeEnter: auth
    },
    {
        path: '/admin/criteria', name: 'criteriaAdmin', component: () => import('../views/criteriaAdmin.vue'), display: 'Tiêu chí đánh giá', beforeEnter: auth
    },
    {
        path: '/admin/employee', name: 'employeeAdmin', component: () => import('../views/employeeAdmin.vue'), display: 'Quản lý nhân viên', beforeEnter: auth
    },
    {
        path: '/admin/review', name: 'replyAdmin', component: () => import('../views/replyAdmin.vue'), display: 'Quản lý phản hồi', beforeEnter: auth
    },
    {
        path: '/admin/goal', name: 'goalAdmin', component: () => import('../views/goalAdmin.vue'), display: 'Quản lý mục tiêu', beforeEnter: auth
    },
    // Third party System
    {
        path: '/thirdParty', name: 'thirdParty', component: () => import('../views/thirdParty.vue'), display: 'Hệ thống thứ ba'
    },
    {
        path: '*', name: 'errorPage', component: () => import('../views/page404.vue'), display: 'Không tìm thấy trang'
    },
]