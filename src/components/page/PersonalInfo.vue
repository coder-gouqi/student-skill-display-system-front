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
            <el-form :model='form' :rules='rules' ref='person' label-width='100px'>
                <el-form-item label='学号' prop='studentNumber'>
                    <el-input v-model='form.studentNumber' style='width: 223px'></el-input>
                </el-form-item>
                <el-form-item label='学院' prop='studentAcademy'>
                    <el-select value-key='id' v-model='form.studentAcademy' placeholder='学院名称'
                               class='handle-select mr10'
                               @change='selectChange'
                               clearable
                               filterable>
                        <el-option
                            v-for='item in academyList'
                            :key='item.id'
                            :label='item.academyName'
                            :value='item'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='班级' prop='studentClass'>
                    <el-input v-model='form.studentClass' style='width: 223px'></el-input>
                </el-form-item>
                <el-form-item label='姓名' prop='userName'>
                    <el-input v-model='form.userName' style='width: 223px'></el-input>
                </el-form-item>
                <el-form-item label='年级' prop='studentGrade'>
                    <el-select v-model='form.studentGrade' placeholder='请选择年级'>
                        <el-option label='2020级' value='2020级'></el-option>
                        <el-option label='2021级' value='2021级'></el-option>
                        <el-option label='2022级' value='2022级'></el-option>
                        <el-option label='2023级' value='2023级'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type='primary' @click='submitForm'>保存</el-button>
                    <el-button @click='resetForm'>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { userGetLogin } from '@/api/user';
import { academySelectAll } from '@/api/academy';
import { studentUpdate } from '@/api/student';

export default {
    name: 'personalInfo',
    data() {
        return {
            form: {
                id: '',
                studentNumber: '',
                studentAcademy: '',
                studentAcademyId: '',
                studentClass: '',
                userName: '',
                studentGrade: '',
                studentPhoto: '',
                isUpload: false,
                isChange: false
            },
            academyList: [],
            rules: {
                studentNumber: [
                    { required: true, message: '请输入学号', trigger: 'blur' },
                ],
                studentAcademy: [
                    { required: true, message: '请选择学院', trigger: 'change' }
                ],
                studentClass: [
                    { required: true, message: '请输入班级', trigger: 'blur' },
                    { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                ],
                userName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 15, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                studentGrade: [
                    { required: true, message: '请选择年级', trigger: 'change' }
                ]
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            userGetLogin().then(res => {
                this.form = res.data;
            });
            academySelectAll().then(res => {
                this.academyList = res.data;
            });
            let len = this.academyList.length;
            for (let i = 0; i < len; i++) {
                if (this.academyList[i].academyName === this.form.studentAcademy)
                    this.form.studentAcademyId = this.academyList[i].id;
            }
        },
        selectChange(val) {
            this.form.studentAcademyId = val.id;
        },
        submitForm() {
            this.$refs.person.validate((valid) => {
                if (valid) {
                    studentUpdate(this.form).then(res => {
                        if (res.code == 1) {
                            this.$message.success('更新成功');
                        } else {
                            this.$message.error('更新失败');
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs.person.resetFields();
        }
    }
};
</script>
