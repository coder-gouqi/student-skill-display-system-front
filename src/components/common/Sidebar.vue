<template>
    <div class='sidebar'>
        <el-menu
            class='sidebar-el-menu'
            :default-active='onRoutes'
            :collapse='collapse'
            background-color='#0C102D'
            text-color='#BFCBD9'
            active-text-color='#409EEC'
            router
        >
            <template v-for='item in items' v-if='item.visiable'>
                <template>
                    <el-menu-item :index='item.index' :key='item.index'>
                        <i :class='item.icon'></i>
                        <span slot='title'>{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from './bus';

export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-s-home',
                    index: 'welcome',
                    title: '欢迎页',
                    visiable: true,
                    roles: ['student', 'admin']
                },
                {
                    icon: 'el-icon-reading',
                    index: 'student',
                    title: '学生信息管理',
                    visiable: true,
                    roles: ['admin']
                },
                {
                    icon: 'el-icon-notebook-2',
                    index: 'course',
                    title: '课程信息管理',
                    visiable: true,
                    roles: ['admin']
                },
                {
                    icon: 'el-icon-document',
                    index: 'score',
                    title: '学生成绩管理',
                    visiable: true,
                    roles: ['admin']
                },
                {
                    icon: 'el-icon-office-building',
                    index: 'academy',
                    title: '学院信息管理',
                    visiable: true,
                    roles: ['admin']
                },
                {
                    icon: 'el-icon-s-flag',
                    index: 'skillIndex',
                    title: '技能指标管理',
                    visiable: true,
                    roles: ['admin']
                },
                {
                    icon: 'el-icon-s-data',
                    index: 'skillLevel',
                    title: '技能等级管理',
                    visiable: true,
                    roles: ['admin']

                },
                {
                    icon: 'el-icon-s-platform',
                    index: 'skill',
                    title: '个人技能展示',
                    visiable: true,
                    roles: ['student', 'admin']
                },
                {
                    icon: 'el-icon-user',
                    index: 'personalInfo',
                    title: '个人信息管理',
                    visiable: true,
                    roles: ['student']
                }
            ],
            role: ''
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    async created() {
        this.role = localStorage.getItem('roles');
        this.items.forEach(element => {
            element.visiable = element.roles.includes(this.role);
        });
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}

.sidebar > ul {
    height: 100%;
}
</style>
