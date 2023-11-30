<template>
    <div>
        <div class='crumbs'>
            <el-breadcrumb separator='/'>
                <el-breadcrumb-item>
                    <i class='el-icon-lx-cascades'></i> 个人技能展示
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='container'>
            <div class='handle-box'>
            </div>
            <el-table
                :data='scoreList'
                border
                class='table'
                ref='multipleTable'
                header-cell-class-name='table-header'
            >
                <el-table-column prop='scoreId' label='学生id' align='center' v-if='false'></el-table-column>
                <el-table-column prop='courseName' label='学生姓名' align='center'></el-table-column>
                <el-table-column prop='studentName' label='学生成绩' align='center'></el-table-column>
                <el-table-column label='操作' width='180' align='center'>
                    <template slot-scope='scope'>
                        <el-button
                            type='text'
                            @click='handleEdit(scope.$index, scope.row)'
                        >查看能力等级
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
        <el-dialog title='查看能力等级' :visible.sync='editVisible' width='50%'
                   @open='open()'
                   :modal-append-to-body='false'
                   append-to-body>
            <div class='Echarts'>
                <div id='main' style='width: 800px;height:600px;'></div>
            </div>
        </el-dialog>
    </div>
</template>

<script>

import { scoreAdd, scoreDelete, scoreQuery, scoreUpdate } from '@/api/score';

export default {
    name: 'skill',
    data() {
        return {
            query: {
                current: 1,
                pageSize: 10,
                sortField: '',
                sortOrder: 'ascend'
            },
            id: '',
            scoreList: [],
            editVisible: false,
            addVisible: false,
            form: {
                scoreId: '',
                studentName: '',
                courseName: '',
                isChange: false
            },
            idx: -1,
            total: 0
        };
    },
    created() {
        this.getData();
    },
    mounted() {
        this.myEcharts();
    },
    methods: {
        getData() {
            scoreQuery(this.query).then(res => {
                this.scoreList = res.data.records;
                this.total = res.data.total || 0;
            });
        },
        clearForm() {
            this.form.scoreId = '';
            this.form.studentName = '';
            this.form.courseName = '';
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
            this.form.scoreId = row.scoreId;
            this.form.studentName = row.studentName;
            this.form.courseName = row.courseName;
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
        myEcharts() {
            // 基于准备好的dom，初始化echarts实例
            const myChart = this.$echarts.init(document.getElementById('main'));

            // 指定图表的配置项和数据
            const option = {
                title: {
                    text: '学生能力等级雷达图'
                },
                legend: {
                    data: ['张三']
                },
                radar: {
                    // shape: 'circle',
                    indicator: [
                        { name: '数理水平', max: 100 },
                        { name: '专业技能', max: 100 },
                        { name: '动手实践', max: 100 },
                        { name: '外语水平', max: 100 },
                        { name: '文化素养', max: 100 },
                        { name: '身体素质', max: 100 }
                    ]
                },
                series: [
                    {
                        name: 'Budget vs spending',
                        type: 'radar',
                        data: [
                            {
                                value: [12, 34, 68, 89, 68, 45],
                                name: '张三'
                            }
                        ]
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener('resize', () => {
                myChart.resize();
            });
        },
        open() {
            this.$nextTick(() => {
                //  执行echarts方法
                this.myEcharts();
            });
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

</style>
