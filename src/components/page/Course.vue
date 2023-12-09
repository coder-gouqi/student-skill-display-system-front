<template>
    <div>
        <div class='crumbs'>
            <el-breadcrumb separator='/'>
                <el-breadcrumb-item>
                    <i class='el-icon-lx-cascades'></i> 课程信息管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='container'>
            <div class='handle-box'>
                <el-button
                    type='primary'
                    class='handle-del mr10'
                    @click='handleAdd'
                >添加课程信息
                </el-button>
                <el-input v-model='query.courseName' placeholder='课程名称' class='handle-input mr10'></el-input>
                <el-select value-key='id' v-model='query.skillIndexName' placeholder='技能指标'
                           class='handle-select mr10'
                           @change='selectChange'>
                    <el-option
                        v-for='item in skillIndexList'
                        :key='item.id'
                        :label='item.skillIndexName'
                        :value='item'>
                    </el-option>
                </el-select>
                <el-button type='primary' icon='el-icon-search' @click='handleSearch'>搜索</el-button>
            </div>
            <el-table
                :data='courseList'
                border
                class='table'
                ref='multipleTable'
                header-cell-class-name='table-header'
            >
                <el-table-column prop='id' label='课程id' align='center' v-if='false'></el-table-column>
                <el-table-column prop='courseName' label='课程名称' align='center'></el-table-column>
                <el-table-column prop='courseSkillIndex' label='所属技能指标' align='center'></el-table-column>
                <el-table-column prop='courseWeight' label='权重' align='center'></el-table-column>
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
                <el-form-item label='所属技能指标'>
                    <el-input v-model='form.courseSkillIndex' @change='isChange' style='width: 360px'></el-input>
                </el-form-item>
                <el-form-item label='权重'>
                    <el-input v-model='form.courseWeight' @change='isChange' style='width: 360px'></el-input>
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
                <el-form-item label='所属技能指标'>
                    <el-input v-model='form.courseSkillIndex' @change='isChange' style='width: 360px'></el-input>
                </el-form-item>
                <el-form-item label='权重'>
                    <el-input v-model='form.courseWeight' @change='isChange' style='width: 360px'></el-input>
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

import { courseAdd, courseDelete, courseQuery, courseUpdate } from '@/api/course';
import { skillQuery } from '@/api/skill';

export default {
    name: 'course',
    data() {
        return {
            query: {
                current: 1,
                pageSize: 10,
                courseName: '',
                skillIndexName: '',
                sortField: '',
                sortOrder: 'ascend'
            },
            id: '',
            courseList: [],
            skillIndexList: [],
            editVisible: false,
            addVisible: false,
            form: {
                id: '',
                courseName: '',
                courseSkillIndex: '',
                courseWeight: '',
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
            courseQuery(this.query).then(res => {
                this.courseList = res.data.records;
                this.total = res.data.total || 0;
            });
            let params = {
                current: 1,
                pageSize: 10,
                sortField: '',
                sortOrder: 'ascend'
            };
            skillQuery(params).then(res => {
                this.skillIndexList = res.data().records;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            try {
                if (this.query.courseName === '' && this.query.skillIndexName === '') {
                    this.$message.error('搜索内容为空');
                    return;
                }
                this.getData();
            } catch (e) {
                this.$message.error('搜索失败');
            }
            this.$message.success('搜索成功');
        },
        selectChange(val) {
            this.query.courseSkillIndexId = val.id;
            this.query.skillIndexName = val.skillIndexName;
        },
        clearForm() {
            this.form.id = '';
            this.form.courseName = '';
            this.form.courseSkillIndex = '';
            this.form.courseWeight = '';
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('是否确认删除？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    courseDelete(row).then((res) => {
                        if (res.code == 1) {
                            this.$message.success('删除成功');
                            this.courseList.splice(index, 1);
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
                courseAdd(this.form).then((res) => {
                    if (res.code == 1) {
                        this.$message.success('添加成功');
                        this.getData();
                        this.clearForm();
                        this.$set(this.courseList, this.form);
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
            this.form.courseName = row.courseName;
            this.form.courseSkillIndex = row.courseSkillIndex;
            this.form.courseWeight = row.courseWeight;
            this.form.isChange = false;
            this.$set(this.form);
        },
        // 保存编辑
        saveEdit() {
            if (this.form.isChange) {
                this.editVisible = false;
                courseUpdate(this.form).then((res) => {
                    if (res.code == 1) {
                        this.$message.success('更新失败');
                        this.getData();
                        this.clearForm();
                        this.$set(this.courseList, this.form);
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

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
</style>
