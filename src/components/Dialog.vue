<template>
    <div class="dilog">
        <el-dialog title="添加资金信息"
                   :visible.sync="dialog.show"
                   :close-on-click-modal="false"
                   :modal-append-to-body="false"
        >
            <div class="form">
                <el-form ref="form"
                         :model="formData"
                         :rules="from_rules"
                         label-width="120px"
                         style="margin:10px;width:auto;"
                >
                    <el-form-item label="收支类型">
                        <el-select v-model="formData.type" placeholder="收支类型">
                            <el-option v-for="(formtype, index) in formartTypeList" :key="index" :label="formtype" :value="formtype">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="describe" label="收支描述">
                        <el-input type="describe" v-model="formData.describe"></el-input>
                    </el-form-item>
                    <el-form-item prop="income" label="收入">
                        <el-input type="income" v-model="formData.income"></el-input>
                    </el-form-item>
                    <el-form-item prop="expend" label="支出">
                        <el-input type="expend" v-model="formData.expend"></el-input>
                    </el-form-item>
                    <el-form-item prop="cash" label="现金帐户">
                        <el-input type="cash" v-model="formData.cash"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="formData.remark"></el-input>
                    </el-form-item>
                    <el-form-item class="text-right">
                        <el-button @click="dialog.show=false">取消</el-button>
                        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'Dialog',
        props: {
            dialog: Object
        },
        data() {
            return {
                formData: {
                    type: '',
                    describe: '',
                    income: '',
                    expend: '',
                    cash: '',
                    remark: '',
                    id: ''
                },
                formartTypeList: [
                    'aaa', 'bbb', 'ccc'
                ],
                from_rules: {
                    describe: [{required: true,message: '不能为空',trigger: 'blur'}],
                    income: [{required: true,message: '不能为空',trigger: 'blur'}]
                }
            }
        },
        computed: {},
        watch: {},
        components: {},
        mixins: [],
        methods: {
            onSubmit(form) {
                this.$refs[form].validate(valid => {
                    if (valid) {
                        this.$axios.post("/api/profiles/add", this.formData)
                            .then(res => {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                })
                                this.dialog.show = false
                                this.$emit('updated')
                            })
                    }
                })
            }
        },
        created() {
        },
        mounted() {
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>