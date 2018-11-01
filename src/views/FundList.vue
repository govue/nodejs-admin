<template>
    <div class="fill-container">
        <div>
            <el-form :inline="true" ref="add_data">
                <el-form-item class="btnRight">
                    <el-button type="primary" size="small" icon="view" @click="handleAdd()">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-container">
            <el-table
                    :data="tableData"
                    v-if="tableData.length > 0"
                    max-height="450"
                    border
                    style="width: 100%"
            >
                <el-table-column type="index" label="序号" align="center" width="200"></el-table-column>
                <el-table-column prop="date" label="日期" align="center" width="250">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="收支类型" align="center" width="150"></el-table-column>
                <el-table-column prop="describe" label="描述" align="center" width="100"></el-table-column>
                <el-table-column prop="income" label="收入" align="center" width="100">
                    <template slot-scope="scope">
                        <span style="color:#00d053">{{ scope.row.income }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="expend" label="支出" align="center" width="100">
                    <template slot-scope="scope">
                        <span style="color:#f56767">{{ scope.row.expend }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cash" label="帐户现金" align="center" width="100"></el-table-column>
                <el-table-column prop="remark" label="备注" align="center" width="100"></el-table-column>
                <el-table-column prop="operation" label="操作" width="180" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                                size="small"
                                icon="edit"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="small"
                                icon="delete"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <Dialog :dialog="dialog" @updated="getProfile"></Dialog>
    </div>

</template>

<script type="text/ecmascript-6">
    import Dialog from '../components/Dialog'

    export default {
        name: 'FundList',
        props: {},
        data() {
            return {
                tableData: [],
                dialog: {
                    show: false
                }
            }
        },
        computed: {},
        watch: {},
        components: {
            Dialog
        },
        mixins: [],
        methods: {
            getProfile() {
                // 获取表格数据
                this.$axios.get("/api/profiles")
                    .then(res => {
                        this.tableData = res.data
                    })
                    .catch(err => console.log(err))
            },
            handleAdd() {
                this.dialog.show = true
            },
            handleEdit(index, row) {
                console.log(index)
            },
            handleDelete(index, row) {
                console.log('d')
            }
        },
        created() {
            this.getProfile()
        },
        mounted() {
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.fill-container
    width: 100%
    height: 100%
    padding: 16px
    box-sizing: border-box
.btnRight
    float: right
</style>