<template>
    <div>
        <div class='crumbs'>
            <el-breadcrumb separator='/'>
                <el-breadcrumb-item>
                    <i class='el-icon-lx-cascades'></i> 学生成绩管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='container'>
            <div class='handle-box'>
                <el-button
                    type='primary'
                    class='handle-del mr10'
                    @click='handleAdd'
                >添加学生成绩
                </el-button>
                <el-input v-model='query.studentName' placeholder='学生姓名' class='handle-input mr10'></el-input>
                <el-input v-model='query.courseName' placeholder='课程名称' class='handle-input mr10'></el-input>
                <el-button type='primary' class='mr10' icon='el-icon-search' @click='handleSearch'>搜索</el-button>
                <el-upload
                    action=' http://localhost:8080/system/excel/import?type=score'
                    class='import'
                    :on-success='importSuccess'
                    :on-error='importFail'
                    multiple
                    :limit='1'
                    :show-file-list='false'>
                    <el-button class='mr10' type='primary'>导入成绩信息</el-button>
                </el-upload>
            </div>
            <el-table
                :data='scoreList'
                border
                class='table'
                ref='multipleTable'
                header-cell-class-name='table-header'
            >
                <el-table-column prop='id' label='学生成绩id' align='center' v-if='false'></el-table-column>
                <el-table-column prop='courseName' label='课程名称' align='center'></el-table-column>
                <el-table-column prop='studentName' label='学生姓名' align='center'></el-table-column>
                <el-table-column prop='studentScore' label='学生成绩' align='center'></el-table-column>
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
                <el-form-item label='课程名称'>
                    <el-input v-model='form.courseName' @change='isChange' style='width: 360px'></el-input>
                </el-form-item>
                <el-form-item label='学生姓名'>
                    <el-input v-model='form.studentName' @change='isChange' style='width: 360px'></el-input>
                </el-form-item>
                <el-form-item label='学生成绩'>
                    <el-input v-model='form.studentScore' @change='isChange' style='width: 360px'></el-input>
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
                <el-form-item label='课程名称'>
                    <el-input v-model='form.courseName' @change='isChange' style='width: 360px'></el-input>
                </el-form-item>
                <el-form-item label='学生姓名'>
                    <el-input v-model='form.studentName' @change='isChange' style='width: 360px'></el-input>
                </el-form-item>
                <el-form-item label='学生成绩'>
                    <el-input v-model='form.studentScore' @change='isChange' style='width: 360px'></el-input>
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

import { scoreAdd, scoreDelete, scoreQuery, scoreUpdate } from '@/api/score';

export default {
    name: 'score',
    data() {
        return {
            query: {
                current: 1,
                pageSize: 10,
                studentName: '',
                courseName: '',
                sortField: '',
                sortOrder: 'ascend'
            },
            id: '',
            scoreList: [],
            courseList: [],
            studentList: [],
            editVisible: false,
            addVisible: false,
            form: {
                id: '',
                studentName: '',
                courseName: '',
                studentScore: '',
                isChange: false
            },
            idx: -1,
            total: 0
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            scoreQuery(this.query).then(res => {
                this.scoreList = res.data.records;
                this.total = res.data.total || 0;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            try {
                if (this.query.courseName === '' && this.query.studentName === '') {
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
            this.form.studentName = '';
            this.form.courseName = '';
            this.form.studentScore = '';
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('是否确认删除？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    scoreDelete(row).then((res) => {
                        if (res.code == 1) {
                            this.$message.success('删除成功');
                            this.scoreList.splice(index, 1);
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
            if (this.form.isChange) {
                this.addVisible = false;
                scoreAdd(this.form).then((res) => {
                    if (res.code == 1) {
                        this.$message.success('添加成功');
                        this.getData();
                        this.clearForm();
                        this.$set(this.scoreList, this.form);
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
            this.form.id = row.id;
            this.form.studentName = row.studentName;
            this.form.courseName = row.courseName;
            this.form.studentScore = row.studentScore;
            this.form.isChange = false;
            this.$set(this.form);
        },
        // 保存编辑
        saveEdit() {
            if (this.form.isChange) {
                this.editVisible = false;
                scoreUpdate(this.form).then((res) => {
                    if (res.code == 1) {
                        this.$message.success('更新失败');
                        this.getData();
                        this.clearForm();
                        this.$set(this.scoreList, this.form);
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
        importSuccess() {
            this.$message.success('导入成功');
        },
        importFail() {
            this.$message.error('导入失败');
        }
    }
};

</script>

<style scoped>

.handle-box /deep/ .el-upload {
    display: inline;
    text-align: center;
    cursor: pointer;
    outline: 0;
}

.handle-box /deep/ .import {
    display: inline;
}

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

.handle-input {
    width: 300px;
    display: inline-block;
}

</style>
