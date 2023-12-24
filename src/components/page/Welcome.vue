<template>
    <div style='text-align: center;margin-top: 250px'>
        <h1>欢迎您进入学生技能展示系统，{{ this.userName }}！！！</h1>
    </div>
</template>
<script>


export default {
    name: 'welcome',
    created() {
        this.userName = localStorage.getItem('username');
    },
    data() {
        return {
            userName: ''
        };
    },
    methods: {}
};
</script>
