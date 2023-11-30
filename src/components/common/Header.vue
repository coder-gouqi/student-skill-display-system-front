<template>
    <div class='header'>
        <!-- 折叠按钮 -->
        <div class='collapse-btn' @click='collapseChage'>
            <i v-if='!collapse' class='el-icon-s-fold'></i>
            <i v-else class='el-icon-s-unfold'></i>
        </div>
        <div class='logo'>学生技能展示系统</div>
        <div class='header-right'>
            <div class='header-user-con'>
                <!-- 全屏显示 -->
                <div class='btn-fullscreen' @click='handleFullScreen'>
                    <el-tooltip effect='dark' :content='fullscreen?`取消全屏`:`全屏`'
                                placement='bottom'>
                        <i class='el-icon-rank'></i>
                    </el-tooltip>
                </div>
                <!-- 用户头像 -->
                <div class='user-avatar'>
                    <img src='../../assets/img/avatar.jpg' />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class='user-name' trigger='click' @command='handleCommand'>
                    <span class='el-dropdown-link'>
                        {{ username }}
                        <i class='el-icon-caret-bottom'></i>
                    </span>
                    <el-dropdown-menu slot='dropdown'>
                        <el-dropdown-item divided command='logout'>注销</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import bus from './bus';
import { userLogout } from '@/api/user';

export default {
    data() {
        return {
            collapse: false,
            fullscreen: false,
            name: 'user'
        };
    },
    computed: {
        username() {
            let username = localStorage.getItem('username');
            return username ? username : this.name;
        }
    },
    methods: {
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'logout') {
                userLogout().then((res) => {
                    if (res.code == 1) {
                        localStorage.removeItem('username');
                        this.$message.success('注销成功');
                        this.$router.push('/login');
                    } else {
                        this.$message.error('注销失败');
                    }
                });
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}

.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}

.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}

.header-right {
    float: right;
    padding-right: 50px;
}

.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}

.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}

.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}


.btn-bell .el-icon-bell {
    color: #fff;
}

.user-name {
    margin-left: 10px;
}

.user-avatar {
    margin-left: 20px;
}

.user-avatar img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
</style>
