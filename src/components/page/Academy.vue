<template>
    <div>
        <div class='crumbs'>
            <el-breadcrumb separator='/'>
                <el-breadcrumb-item>
                    <i class='el-icon-lx-cascades'></i> 学院信息管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='container'>
            <div class='handle-box'>
                <el-button
                    type='primary'
                    class='handle-del mr10'
                    @click='handleAdd'
                >添加学院
                </el-button>
                <el-input v-model='query.academyName' placeholder='学院名称' class='handle-input mr10'></el-input>
                <el-input v-model='query.academyInfo' placeholder='学院简介' class='handle-input mr10'></el-input>
                <el-button type='primary' icon='el-icon-search' @click='handleSearch'>搜索</el-button>
            </div>
            <el-table
                :data='academyList'
                border
                class='table'
                ref='multipleTable'
                header-cell-class-name='table-header'
            >
                <el-table-column prop='id' label='学院id' align='center' v-if='false'></el-table-column>
                <el-table-column prop='academyName' label='学院名称' align='center'></el-table-column>
                <el-table-column prop='academyInfo' label='学院简介' align='center'></el-table-column>
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
                <el-form-item label='学院'>
                    <el-input v-model='form.academyName' @change='isChange' style='width: 360px'></el-input>
                </el-form-item>
                <el-form-item label='简介'>
                    <el-input v-model='form.academyInfo' @change='isChange' style='width: 360px'
                              type='textarea' :rows='6'></el-input>
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
                        <img v-if='form.academyPhoto' :src='form.academyPhoto' class='avatar' style='width: 100%'>
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
                <el-form-item label='学院名称'>
                    <el-input v-model='form.academyName' @change='isChange' style='width: 360px'></el-input>
                </el-form-item>
                <el-form-item label='简介'>
                    <el-input v-model='form.academyInfo' @change='isChange' style='width: 360px'
                              type='textarea' :rows='6'></el-input>
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
                        <img v-if='form.academyPhoto' :src='form.academyPhoto' class='avatar' style='width: 100%'>
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

import { academyAdd, academyDelete, academyQuery, academyUpdate, academyUpload } from '../../api/academy';
import { hostUrl } from '@/api/http';

export default {
    name: 'academy',
    data() {
        return {
            query: {
                current: 1,
                pageSize: 10,
                academyName: '',
                academyInfo: '',
                sortField: '',
                sortOrder: 'ascend'
            },
            id: '',
            TempPhotoUrl: '',
            academyList: [],
            editVisible: false,
            addVisible: false,
            form: {
                id: '',
                academyName: '',
                academyInfo: '',
                academyPhoto: '',
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
            // return hostUrl + scope.row.academyPhoto;
            return scope.row.academyPhoto;
        },
        getData() {
            academyQuery(this.query).then(res => {
                this.academyList = res.data.records;
                this.total = res.data.total || 0;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            try {
                if (this.query.academyName === '' && this.query.academyInfo === '') {
                    this.$message.error('搜索内容为空');
                    return;
                }
                this.getData();
            } catch (e) {
                this.$message.error('搜索失败');
            }
            this.$message.success('搜索成功');
        },
        clearForm() {
            this.form.id = '';
            this.form.academyName = '';
            this.form.academyInfo = '';
            this.form.academyPhoto = '';
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
                    academyDelete(row).then((res) => {
                        if (res.code == 1) {
                            this.$message.success('删除成功');
                            this.academyList.splice(index, 1);
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
                this.form.academyPhoto = this.TempPhotoUrl;
                academyAdd(this.form).then((res) => {
                    if (res.code == 1) {
                        this.$message.success('添加成功');
                        this.getData();
                        this.clearForm();
                        this.$set(this.academyList, this.form);
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
            // this.form.academyPhoto = hostUrl + row.academyPhoto;
            this.form.academyPhoto = row.academyPhoto;
            this.form.id = row.id;
            this.form.academyName = row.academyName;
            this.form.academyInfo = row.academyInfo;
            this.form.isUpload = false;
            this.form.isChange = false;
            this.$set(this.form);
        },
        // 保存编辑
        saveEdit() {
            if (this.form.isUpload || this.form.isChange) {
                this.editVisible = false;
                if (this.form.isUpload) {
                    this.form.academyPhoto = this.TempPhotoUrl;
                } else {
                    const str = this.form.academyPhoto;
                    const reg = new RegExp(hostUrl, '');
                    this.form.academyPhoto = str.replace(reg, '');
                }
                academyUpdate(this.form).then((res) => {
                    if (res.code == 1) {
                        this.$message.success('更新成功');
                        this.getData();
                        this.clearForm();
                        this.$set(this.academyList, this.form);
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
            this.form.academyPhoto = this.imageUrl;
            this.$set(this.form);
        },
        async uploadConfirm() {
            const form = new FormData();
            form.append('file', this.file);
            this.form.isUpload = true;
            await academyUpload(form).then((res) => {
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

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

</style>
