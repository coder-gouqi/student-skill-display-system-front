<template>
    <div class='login-wrap'>
        <div class='ms-login'>
            <div class='ms-title'>学生技能展示系统</div>
            <el-form :model='form' :rules='rules' ref='login' label-width='0px' class='ms-content'>
                <el-form-item prop='title'>
                    <el-input v-model='form.title' placeholder='userAccount'>
                        <el-button slot='prepend' icon='el-icon-user'></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop='content'>
                    <el-input
                        type='password'
                        placeholder='userPassword'
                        v-model='form.content'
                        @keyup.enter.native='submitForm()'
                    >
                        <el-button slot='prepend' icon='el-icon-lock'></el-button>
                    </el-input>
                </el-form-item>
                <div class='login-btn'>
                    <el-button type='primary' @click='submitForm()'>登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>

export default {
    data: function() {
        return {
            form: {
                id: '',
                title: '',
                content: ''
            },
            rules: {
                title: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                content: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    // itemQuery(this.form).then((res) => {
                    //     if (res.data != null) {
                    //         this.$message.success('登录成功');
                    //         localStorage.setItem('username', this.form.title);
                    //         this.$router.push('/');
                    //     } else {
                    //         this.$message.error('登录失败，账号或密码错误');
                    //         return false;
                    //     }
                    // });
                    this.$message.success('登录成功');
                    localStorage.setItem('username', this.form.title);
                    this.$router.push('/');
                } else {
                    this.$message.error('请输入账号和密码');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/background.jpeg);
    background-size: 100%;
}

.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}

.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}

.ms-content {
    padding: 30px 30px;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
</style>
