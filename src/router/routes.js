import auth from '../middleware/auth'
import noAuth from '../middleware/noAuth'

export const routes = [
    {
        path: '/', name: 'login', component: () => import('../views/login.vue'), display: 'Đăng nhập', beforeEnter: noAuth, meta: { ignoreCheckAccess: true }
    },
    {
        path: '/checkIn', name: 'checkIn', component: () => import('../views/checkIn.vue'), display: 'Tiến độ', beforeEnter: auth, meta: { ignoreCheckAccess: true }
    },
    {
        path: '/checkInCompany', name: 'checkInCompany', component: () => import('../views/checkInCompany.vue'), display: 'Tiến độ công ty', beforeEnter: auth, meta: { ignoreCheckAccess: true }
    },
    {
        path: '/conversation', name: 'conversation', component: () => import('../views/conversation.vue'), display: 'Hội thoại', beforeEnter: auth, meta: { ignoreCheckAccess: true }
    },
    {
        path: '/board', name: 'board', component: () => import('../views/board.vue'), display: 'Quản lý công việc', beforeEnter: auth, meta: { ignoreCheckAccess: true }
    },
    {
        path: '/boardDetail/:id', name: 'boardDetail', component: () => import('../views/boardDetail.vue'), display: 'Chi tiết quản lý công việc', beforeEnter: auth, meta: { ignoreCheckAccess: true }
    },
    {
        path: '/createCompany', name: 'createCompany', component: () => import('../views/createCompany.vue'), display: 'Tạo công ty', beforeEnter: noAuth, meta: { ignoreCheckAccess: true }
    },
    {
        path: '/userInfo', name: 'userInfo', component: () => import('../views/userInfo.vue'), display: 'Thông tin tài khoản', meta: { ignoreCheckAccess: true }
    },
    {
        path: '/login', name: 'login', component: () => import('../views/login.vue'), display: 'Đăng nhập', beforeEnter: noAuth, meta: { ignoreCheckAccess: true }
    },
    
    /* Admin */
    {
        path: '/admin/dashboard', name: 'dashboardAdmin', component: () => import('../views/dashboardAdmin.vue'), display: 'Bảng điều khiển', beforeEnter: auth, meta: { accessRight: 'admin' }
    },
    {
        path: '/admin/company', name: 'companyAdmin', component: () => import('../views/companyAdmin.vue'), display: 'Thông tin công ty', beforeEnter: auth, meta: { accessRight: 'admin' }
    },
    {
        path: '/admin/question', name: 'checkInQuestionAdmin', component: () => import('../views/checkInQuestionAdmin.vue'), display: 'Câu hỏi check in', beforeEnter: auth, meta: { accessRight: 'admin' }
    },
    {
        path: '/admin/cycle', name: 'cycleAdmin', component: () => import('../views/cycleAdmin.vue'), display: 'Quản lý chu kỳ', beforeEnter: auth, meta: { accessRight: 'admin' }
    },
    {
        path: '/admin/department', name: 'departmentAdmin', component: () => import('../views/departmentAdmin.vue'), display: 'Quản lý phòng ban', beforeEnter: auth, meta: { accessRight: 'admin' }
    },
    {
        path: '/admin/position', name: 'positionAdmin', component: () => import('../views/positionAdmin.vue'), display: 'Quản lý vị trí công việc', beforeEnter: auth, meta: { accessRight: 'admin' }
    },
    {
        path: '/admin/criteria', name: 'criteriaAdmin', component: () => import('../views/criteriaAdmin.vue'), display: 'Tiêu chí đánh giá', beforeEnter: auth, meta: { accessRight: 'admin' }
    },
    {
        path: '/admin/employee', name: 'employeeAdmin', component: () => import('../views/employeeAdmin.vue'), display: 'Quản lý nhân viên', beforeEnter: auth, meta: { accessRight: 'admin' }
    },
    {
        path: '/admin/review', name: 'replyAdmin', component: () => import('../views/replyAdmin.vue'), display: 'Quản lý phản hồi', beforeEnter: auth, meta: { accessRight: 'admin' }
    },
    {
        path: '/admin/goal', name: 'goalAdmin', component: () => import('../views/goalAdmin.vue'), display: 'Quản lý mục tiêu', beforeEnter: auth, meta: { accessRight: 'admin' }
    },
    // Third party System
    {
        path: '/thirdParty', name: 'thirdParty', component: () => import('../views/thirdParty.vue'), display: 'Hệ thống thứ ba', meta: { accessRight: 'admin' }
    },
    {
        path: '*', name: 'errorPage', component: () => import('../views/page404.vue'), display: 'Không tìm thấy trang'
    },
]