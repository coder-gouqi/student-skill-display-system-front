import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/welcome'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: 'index' },
            children: [
                {
                    path: '/welcome',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/Welcome.vue'),
                    meta: { title: '欢迎页' }
                },
                {
                    path: '/student',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/Student.vue'),
                    meta: { title: '学生管理' }
                },
                {
                    path: '/score',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/Score.vue'),
                    meta: { title: '学生成绩管理' }
                },
                {
                    path: '/academy',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/Academy.vue'),
                    meta: { title: '学院管理' }
                },
                {
                    path: '/skillIndex',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/SkillIndex.vue'),
                    meta: { title: '技能指标' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '找不到页面' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: 'Login' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
