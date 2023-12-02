<template>
    <div>
        <div class='crumbs'>
            <el-breadcrumb separator='/'>
                <el-breadcrumb-item>
                    <i class='el-icon-lx-cascades'></i> 学生信息管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='container'>
            <div class='handle-box'>
                <el-button
                    type='primary'
                    class='handle-del mr10'
                    @click='handleAdd'
                >添加学生
                </el-button>
            </div>
            <el-table
                :data='studentList'
                border
                class='table'
                ref='multipleTable'
                header-cell-class-name='table-header'
            >
                <el-table-column prop='id' label='学生id' align='center' v-if='false'></el-table-column>
                <el-table-column prop='studentNumber' label='学号' align='center'></el-table-column>
                <el-table-column prop='studentAcademy' label='学院' align='center'></el-table-column>
                <el-table-column prop='studentClass' label='班级' align='center'></el-table-column>
                <el-table-column prop='studentName' label='姓名' align='center'></el-table-column>
                <el-table-column prop='studentGrade' label='年级' align='center'></el-table-column>
                <el-table-column label='照片' align='center'>
                    <template slot-scope='scope'>
                        <el-image
                            class='table-td-thumb'
                            :src='getBaseURLToList(scope)'
                            :preview-src-list='[getBaseURLToList(scope)]'
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column label='操作' width='180' align='center'>
                    <template slot-scope='scope'>
                        <el-button
                            type='text'
                            icon='el-icon-edit'
                            @click='handleEdit(scope.$index, scope.row)'
                        >编辑
                        </el-button>
                        <el-button
                            type='text'
                            icon='el-icon-delete'
                            class='red'
                            @click='handleDelete(scope.$index, scope.row)'
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class='pagination'>
                <el-pagination
                    background
                    layout='total, prev, pager, next'
                    :current-page='query.current'
                    :page-size='query.pageSize'
                    :total='total'
                    @current-change='handlePageChange'
                ></el-pagination>
            </div>
        </div>

        <!-- 添加弹出框 -->
        <el-dialog title='添加' :visible.sync='addVisible' width='50%'>
            <el-form :model='form' label-width='120px'>
                <el-form-item label='学号'>
                    <el-input v-model='form.studentNumber' @change='isChange' style='width: 360px'></el-input>
                </el-form-item>
                <el-form-item label='学院'>
                    <el-input v-model='form.studentAcademy' @change='isChange' style='width: 360px'></el-input>
                </el-form-item>
                <el-form-item label='班级'>
                    <el-input v-model='form.studentClass' @change='isChange' style='width: 360px'></el-input>
                </el-form-item>
                <el-form-item label='姓名'>
                    <el-input v-model='form.studentName' @change='isChange' style='width: 360px'></el-input>
                </el-form-item>
                <el-form-item label='年级'>
                    <el-input v-model='form.studentGrade' @change='isChange' style='width: 360px'></el-input>
                </el-form-item>
                <el-form-item label='照片' prop='file'>
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
                        <img v-if='form.photoUrl' :src='form.photoUrl' class='avatar' style='width: 100%'>
                        <i v-else class='el-icon-plus avatar-uploader-icon'></i>
                    </el-upload>
                    <el-button type='primary' @click='uploadConfirm'>上传</el-button>
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button @click='addVisible = false'>取消</el-button>
                <el-button type='primary' @click='saveAdd'>确认</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog title='编辑' :visible.sync='editVisible' width='50%'>
            <el-form :model='form' label-width='120px'>
                <el-form-item label='学号'>
                    <el-input v-model='form.studentNumber' @change='isChange' style='width: 360px'></el-input>
                </el-form-item>
                <el-form-item label='学院'>
                    <el-input v-model='form.studentAcademy' @change='isChange' style='width: 360px'></el-input>
                </el-form-item>
                <el-form-item label='班级'>
                    <el-input v-model='form.studentClass' @change='isChange' style='width: 360px'></el-input>
                </el-form-item>
                <el-form-item label='姓名'>
                    <el-input v-model='form.studentName' @change='isChange' style='width: 360px'></el-input>
                </el-form-item>
                <el-form-item label='年级'>
                    <el-input v-model='form.studentGrade' @change='isChange' style='width: 360px'></el-input>
                </el-form-item>
                <el-form-item label='photo' prop='file'>
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
                        <img v-if='form.photoUrl' :src='form.photoUrl' class='avatar' style='width: 100%'>
                        <i v-else class='el-icon-plus avatar-uploader-icon'></i>
                    </el-upload>
                    <el-button type='primary' @click='uploadConfirm'>上传</el-button>
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button @click='editVisible = false'>取消</el-button>
                <el-button type='primary' @click='saveEdit'>确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

import { studentAdd, studentDelete, studentQuery, studentUpdate, studentUpload } from '../../api/student';
import { hostUrl } from '@/api/http';

export default {
    name: 'student',
    data() {
        return {
            query: {
                current: 1,
                pageSize: 10,
                sortField: '',
                sortOrder: 'ascend'
            },
            id: '',
            TempPhotoUrl: '',
            studentList: [],
            topicList: [],
            editVisible: false,
            addVisible: false,
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
            idx: -1,
            total: 0,
            imageUrl: '',
            file: ''
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getBaseURLToList(scope) {
            // return hostUrl + scope.row.photoUrl;
            return scope.row.photoUrl;
        },
        getData() {
            studentQuery(this.query).then(res => {
                this.studentList = res.data.records;
                this.total = res.data.total || 0;
            });
        },
        clearForm() {
            this.form.id = '';
            this.form.studentNumber = '';
            this.form.studentAcademy = '';
            this.form.studentClass = '';
            this.form.studentName = '';
            this.form.studentGrade = '';
            this.form.studentName = '';
            this.form.photoUrl = '';
            this.imageUrl = '';
            this.file = '';
            this.form.isUpload = false;
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('是否确认删除？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    studentDelete(row).then((res) => {
                        if (res.code == 1) {
                            this.$message.success('删除成功');
                            this.studentList.splice(index, 1);
                        } else {
                            this.$message.error('删除失败');
                        }
                    });
                })
                .catch(() => {
                });
        },
        // 添加操作
        handleAdd() {
            this.addVisible = true;
            this.clearForm();
            this.$set(this.form);
        },
        saveAdd() {
            if (this.form.isUpload || this.form.isChange) {
                this.addVisible = false;
                this.form.photoUrl = this.TempPhotoUrl;
                studentAdd(this.form).then((res) => {
                    if (res.code == 1) {
                        this.$message.success('添加成功');
                        this.getData();
                        this.clearForm();
                        this.$set(this.studentList, this.form);
                    }
                });
            } else {
                this.$message.error('添加失败');
                return false;
            }
        },
        isChange() {
            this.form.isChange = true;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.editVisible = true;
            this.idx = index;
            // this.form.photoUrl = hostUrl + row.photoUrl;
            this.form.photoUrl = row.photoUrl;
            this.form.id = row.id;
            this.form.studentNumber = row.studentNumber;
            this.form.studentAcademy = row.studentAcademy;
            this.form.studentClass = row.studentClass;
            this.form.studentName = row.studentName;
            this.form.studentGrade = row.studentGrade;
            this.form.isUpload = false;
            this.form.isChange = false;
            this.$set(this.form);
        },
        // 保存编辑
        saveEdit() {
            if (this.form.isUpload || this.form.isChange) {
                this.editVisible = false;
                if (this.form.isUpload) {
                    this.form.photoUrl = this.TempPhotoUrl;
                } else {
                    const str = this.form.photoUrl;
                    const reg = new RegExp(hostUrl, '');
                    this.form.photoUrl = str.replace(reg, '');
                }
                studentUpdate(this.form).then((res) => {
                    if (res.code == 1) {
                        this.$message.success('更新失败');
                        this.getData();
                        this.clearForm();
                        this.$set(this.studentList, this.form);
                    } else {
                        this.$message.error('更新失败');
                    }
                }).catch(() => {
                    this.$message.error('更新失败');
                });
            } else {
                this.$message.error('更新失败');
                return false;
            }
        },
        // 分页导航
        handlePageChange(val) {
            this.query.current = val;
            this.getData();
        },
        // 上传图片前端
        uploadFile(item) {
            this.file = item.raw; // 图片文件
            this.imageUrl = URL.createObjectURL(item.raw); // 图片上传浏览器回显地址
            this.form.photoUrl = this.imageUrl;
            this.$set(this.form);
        },
        async uploadConfirm() {
            const form = new FormData();
            form.append('file', this.file);
            this.form.isUpload = true;
            await studentUpload(form).then((res) => {
                this.TempPhotoUrl = res;
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


.handle-box {
    margin-bottom: 20px;
}

.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #ff0000;
}

.mr10 {
    margin-right: 10px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    title: relative;
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
