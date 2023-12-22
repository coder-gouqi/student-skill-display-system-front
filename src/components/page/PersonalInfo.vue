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
                <el-form-item label='头像'>
                    <el-upload
                        ref='upload'
                        class='avatar-uploader'
                        :auto-upload='false'
                        action='#'
                        accept='image/jpg,image/jpeg,image/png'
                        :show-file-list='false'
                        :on-change='uploadFile'
                        :before-upload='beforeAvatarUpload'
                        :on-remove='handleRemove'>
                        <img v-if='form.TempPhotoUrl' :src='form.TempPhotoUrl' class='avatar'
                             style='width: 100%'>
                        <i v-else class='el-icon-plus avatar-uploader-icon'></i>
                    </el-upload>
                    <el-button type='primary' @click='uploadConfirm'>上传</el-button>
                </el-form-item>
                <el-form-item label='学号' prop='studentNumber'>
                    <el-input disabled v-model='form.studentNumber' style='width: 223px'></el-input>
                </el-form-item>
                <el-form-item label='学院' prop='studentAcademy'>
                    <el-select disabled value-key='id' v-model='form.studentAcademy' placeholder='学院名称'
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
                    <el-input disabled v-model='form.studentClass' style='width: 223px'></el-input>
                </el-form-item>
                <el-form-item label='姓名' prop='userName'>
                    <el-input disabled v-model='form.userName' style='width: 223px'></el-input>
                </el-form-item>
                <el-form-item disabled label='年级' prop='studentGrade'>
                    <el-select disabled v-model='form.studentGrade' placeholder='请选择年级'>
                        <el-option label='2020级' value='2020级'></el-option>
                        <el-option label='2021级' value='2021级'></el-option>
                        <el-option label='2022级' value='2022级'></el-option>
                        <el-option label='2023级' value='2023级'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type='primary' @click='submitForm'>保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { userGetLogin } from '@/api/user';
import { academySelectAll } from '@/api/academy';
import { studentUpdate, studentUpload } from '@/api/student';
import { hostUrl } from '@/api/http';

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
                TempPhotoUrl: '',
                isUpload: false,
                isChange: false
            },
            imageUrl: '',
            file: '',
            academyList: [],
            rules: {
                studentNumber: [
                    { required: true, message: '请输入学号', trigger: 'blur' }
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
                this.form.TempPhotoUrl = hostUrl + res.data.studentPhoto;
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
        },
        uploadFile(item) {
            this.file = item.raw;
            this.imageUrl = URL.createObjectURL(item.raw);
            this.form.TempPhotoUrl = this.imageUrl;
            this.$set(this.form);
        },
        async uploadConfirm() {
            const form = new FormData();
            form.append('file', this.file);
            form.append('type', 'student');
            this.form.isUpload = true;
            await studentUpload(form).then((res) => {
                this.form.studentPhoto = res;
                this.$message.success('上传成功');
            }).catch(() => {
                this.$message.error('上传失败');
            });
        },
        handleRemove() {
            this.file = '';
        },
        beforeAvatarUpload(file) {
            const isLt10M = file.size / 1024 / 1024 < 10;
            if (!isLt10M) {
                this.$message.error('文件大小不能超过10MB');
            }
            return isLt10M;
        }
    }
};
</script>
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
