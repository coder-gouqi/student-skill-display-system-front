<template>
    <div>
        <div class='crumbs'>
            <el-breadcrumb separator='/'>
                <el-breadcrumb-item>
                    <i class='el-icon-lx-cascades'></i> 个人信息管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='container'>
            <el-form :model='form' :rules='rules' ref='form' label-width='100px'>
                <el-form-item label='学号' prop='studentNumber'>
                    <el-input v-model='form.studentNumber' style='width: 223px'></el-input>
                </el-form-item>
                <el-form-item label='学院' prop='studentAcademy'>
                    <el-select v-model='form.studentAcademy' placeholder='请选择学院'>
                        <el-option label='网络空间安全学院' value='网络空间安全学院'></el-option>
                        <el-option label='电子信息工程学院' value='电子信息工程学院'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='班级' prop='studentClass'>
                    <el-input v-model='form.studentClass' style='width: 223px'></el-input>
                </el-form-item>
                <el-form-item label='姓名' prop='studentName'>
                    <el-input v-model='form.studentName' style='width: 223px'></el-input>
                </el-form-item>
                <el-form-item label='年级' prop='studentGrade'>
                    <el-select v-model='form.studentGrade' placeholder='请选择年级'>
                        <el-option label='2020级' value='2020级'></el-option>
                        <el-option label='2021级' value='2021级'></el-option>
                        <el-option label='2022级' value='2022级'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type='primary' @click="submitForm('form')">保存</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'personalInfo',
    data() {
        return {
            form: {
                id: '',
                studentNumber: '',
                studentAcademy: '',
                studentClass: '',
                studentName: '',
                studentGrade: '',
                photoUrl: '',
                isUpload: false,
                isChange: false
            },
            rules: {
                studentNumber: [
                    { required: true, message: '请输入学号', trigger: 'blur' },
                    { min: 9, max: 10, message: '长度在 9 到 10 个字符', trigger: 'blur' }
                ],
                studentAcademy: [
                    { required: true, message: '请选择学院', trigger: 'change' }
                ],
                studentClass: [
                    { required: true, message: '请输入班级', trigger: 'blur' },
                    { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                ],
                studentName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 15, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                studentGrade: [
                    { required: true, message: '请选择年级', trigger: 'change' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>
