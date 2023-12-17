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
                :data='skillList'
                border
                class='table'
                ref='multipleTable'
                header-cell-class-name='table-header'
            >
                <el-table-column prop='id' label='学生id' align='center' v-if='false'></el-table-column>
                <el-table-column prop='studentName' label='学生姓名' align='center'></el-table-column>
                <el-table-column align='center' v-for='(item,index) in skillList[0].studentSkillScore' :key='index'>
                    <template slot='header'>
                        {{ item.skillIndexName }}
                    </template>
                    <template slot-scope='scope'>{{ scope.row.studentSkillScore[index].skillIndexScore }}</template>
                </el-table-column>
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

import { skillQuery } from '@/api/skill';
import { skillLevelSelectAll } from '@/api/skillLevel';

let myChart;

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
            echartsNow: {
                studentName: '',
                studentSkillIndexName: [],
                studentSkillScore: []
            },
            id: '',
            skillList: [],
            skillLevelList: [],
            editVisible: false,
            addVisible: false,
            form: {
                id: '',
                studentName: '',
                studentSkillScore: '',
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
        async getData() {
            await skillQuery(this.query).then(res => {
                this.skillList = res.data.records;
                this.total = res.data.total || 0;
            });
           await skillLevelSelectAll().then(res => {
                this.skillLevelList = res.data;
            });
            let skillScoreLen = this.skillList[0].studentSkillScore.length;
            for (let j = 0; j < skillScoreLen; j++) {
                this.echartsNow.studentSkillIndexName.push({
                    name: this.skillList[0].studentSkillScore[j].skillIndexName,
                    max: this.skillLevelList.length
                });
            }
        },
        clearForm() {
            this.form.id = '';
            this.form.studentSkillScore = '';
            this.form.studentName = '';
        },
        isChange() {
            this.form.isChange = true;
        },
        // 编辑操作
        async handleEdit(index, row) {
            this.editVisible = true;
            this.idx = index;
            this.form.id = row.id;
            this.echartsNow.studentName = row.studentName;
            let skillLen = this.skillList.length;
            let skillLevelLen = this.skillLevelList.length;
            let result;
            for (let i = 0; i < skillLen; i++) {
                if (this.skillList[i].studentName === row.studentName) {
                    let skillScoreLen = this.skillList[i].studentSkillScore.length;
                    for (let j = 0; j < skillScoreLen; j++) {
                        let tmp = this.skillList[i].studentSkillScore[j].skillIndexScore;
                        for (let k = 0; k < skillLevelLen; k++) {
                            if (tmp >= this.skillLevelList[k].start && tmp <= this.skillLevelList[k].end) {
                                result = this.skillLevelList[k].skillLevel;
                                break;
                            }
                        }
                        this.echartsNow.studentSkillScore.push(result);
                    }
                }
            }
            this.form.isChange = false;
        },
        // 分页导航
        handlePageChange(val) {
            this.query.current = val;
            this.getData();
        },
        async myEcharts() {
            if (myChart != null) {
                myChart.dispose();//销毁
            }
            // 基于准备好的dom，初始化echarts实例
            myChart = this.$echarts.init(document.getElementById('main'));

            // 指定图表的配置项和数据
            const option = {
                title: {
                    text: '学生能力等级雷达图'
                },
                legend: {
                    data: [this.echartsNow.studentName]
                },
                radar: {
                    // shape: 'circle',
                    indicator: this.echartsNow.studentSkillIndexName
                },
                series: [
                    {
                        name: 'Budget vs spending',
                        type: 'radar',
                        data: [
                            {
                                value: this.echartsNow.studentSkillScore,
                                name: this.echartsNow.studentName
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
                this.echartsNow.studentSkillScore = [];
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

</style>
