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
                <el-table-column prop="operation" label="操作" width="" fixed="right">
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
            <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination
                                :page-sizes="paginations.page_sizes"
                                :page-size="paginations.page_size"
                                :layout="paginations.layout"
                                :total="paginations.total"
                                :current-page.sync='paginations.page_index'
                                @current-change='handleCurrentChange'
                                @size-change='handleSizeChange'>
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
        <Dialog :dialog="dialog" :formData="formData" @updated="getProfile"></Dialog>
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
                allTableData: [],
                formData: {
                    type: '',
                    describe: '',
                    income: '',
                    expend: '',
                    cash: '',
                    remark: '',
                    id: ''
                },
              paginations: {
                page_index: 1, // 当前位于哪页
                total: 0, // 总数
                page_size: 5, // 1页显示多少条
                page_sizes: [5, 10, 15, 20], //每页显示多少条
                layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
              },
                dialog: {
                    show: false,
                    title: '添加资金信息',
                    option: 'edit'
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
                        this.allTableData = res.data
                      // 设置分页数据
                      this.setPaginations()
                    })
                    .catch(err => console.log(err))
            },
            handleAdd() {
                this.dialog = {
                    show: true,
                    title: "添加资金信息",
                    option: "add"
                }
                this.formData = {
                    type: '',
                    describe: '',
                    income: '',
                    expend: '',
                    cash: '',
                    remark: '',
                    id: ''
                }
            },
            handleEdit(index, row) {
                this.dialog = {
                    show: true,
                    title: "编辑资金信息",
                    option: "edit"
                }
                this.formData = {
                    type: row.type,
                    describe: row.describe,
                    income: row.income,
                    expend: row.expend,
                    cash: row.cash,
                    remark: row.remark,
                    id: row._id
                }
            },
            handleDelete(index, row) {
                this.$axios.delete(`/api/profiles/delete/${row._id}`)
                    .then(res => {
                        this.$message('删除成功')
                        this.getProfile()
                    })
                    .catch(err => console.log(err))
            },
          handleSizeChange(page_size) {
            this.paginations.page_index = 1
            this.paginations.page_size = page_size
            this.tableData = this.allTableData.filter((item, index) => {
              return index < this.paginations.page_size
            })
          },
          handleCurrentChange(page) {
            let index = this.paginations.page_size * (page -1) // 计算要跳转前的初始值
            let nums = this.paginations.page_size * page // 跳转页最大数据
            let tables = []
            for (let i = index; i < nums; i++) {
              if (this.allTableData[i]) {
                tables.push(this.allTableData[i]) // 将跳转的页数据遍历出来
              }
              this.tableData = tables
            }
          },
          setPaginations() {
              this.paginations.total = this.allTableData.length
              // this.paginations.page_index = 1
              // this.paginations.page_size = 5
              this.tableData = this.allTableData.filter((item, index) => {
                return index < this.paginations.page_size
              })
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
.pagination
    text-align: right
    padding-top: 10px
</style>
