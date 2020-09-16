<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li v-for="(item,index) in menuTab" :key="index" :class="{'current': item.current}"
                    @click="checkup(item)">{{item.txt}}
                </li>
            </ul>
            <!--            表单start      -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="login-form"
                     size="medium">
                <el-form-item prop="username">
                    <label>邮箱</label>
                    <el-input type="text" class="item-form" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <label>密码</label>
                    <el-input type="password" class="item-form" v-model="ruleForm.checkPass"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="passwords" v-show="mode=='register'">
                    <label>重复密码</label>
                    <el-input type="password" class="item-form" v-model="ruleForm.passwords"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <label>验证码</label>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-input class="item-form" v-model.number="ruleForm.code"></el-input>
                        </el-col>
                        <el-col :span="12" >
                            <el-button type="success" class="block" @click="getSms()">验证码</el-button>
                        </el-col>
                    </el-row>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login-btn block" :disabled="loginButtonStatus"  @click="submitForm('ruleForm')">{{mode=='login'? '登录':'注册' }}
                    </el-button>

                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

    import { GetSms } from '@/api/login';
    import {reactive, ref, isRef, toRefs, onMounted} from '@vue/composition-api';
    import {stripscript, validateEmail, validateCode, validatePwd} from '@/utils/validate.js';
    import axios from 'axios';


    export default {
        name: "login",
        setup(props, context) {

            let validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if (validateEmail(value)) {
                    callback(new Error('用户格式有误'));
                } else {
                    callback();
                }
            };
            let validatePass = (rule, value, callback) => {
                value = stripscript(value)
                ruleForm.checkPass = value

                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (validatePwd(value)) {
                    callback(new Error('只能输入6-20个字母、数字、下划线'));
                } else {
                    callback();
                }
            };
            let checkCode = (rule, value, callback) => {
                value = stripscript(value)
                ruleForm.code = value

                if (!value) {
                    return callback(new Error('请输入验证码'));
                } else if (validateCode(value)) {
                    return callback(new Error('验证码有误'));
                } else {
                    callback();
                }

            };
            let passwords = (rule, value, callback) => {
                if (mode.value == 'login') {
                    callback();
                }
                if (value !== ruleForm.checkPass) {
                    return callback(new Error('两次密码不一致'));
                } else {
                    callback();
                }
            };

            //data数据 生命周期 自定义函数
            const menuTab = reactive([
                {txt: '登录', current: true, type: 'login'},
                {txt: '注册', current: false, type: 'register'}
            ])
            //模块值
            const mode = ref('login')

            const loginButtonStatus = ref(true)
            // console.log(isRef(menuTab) ? '是基础类型' : '是对象类型')
            // console.log(mode.value)

            /**
             * 表单数据
             */
            const ruleForm = reactive({
                username: '',
                checkPass: '',
                passwords: '',
                code: ''
            })
            /**
             * 表单验证
             */
            const rules = reactive({
                username: [
                    {validator: validateUser, trigger: 'blur'}
                ],
                checkPass: [
                    {validator: validatePass, trigger: 'blur'}
                ],
                code: [
                    {validator: checkCode, trigger: 'blur'}
                ],
                passwords: [
                    {validator: passwords, trigger: 'blur'}
                ]
            })


            // function useMousePosition() {
            //     const pos = reactive({
            //         x: 1,
            //         y: 0
            //     });
            //     return toRefs(pos)
            // }
            //
            // const {x, y} = useMousePosition();
            // console.log(x.value)

            /**
             * 声明函数
             */
            const checkup = ((data) => {
                menuTab.forEach((ele, index) => {
                    ele.current = false;
                });
                data.current = true;
                if (data.type == 'register') {
                    mode.value = 'register';

                } else {
                    mode.value = 'login';

                }

            })
            /**
             * 获取验证码
             */
            const getSms = (() => {
                GetSms();
                //进行提示
                if(ruleForm.username == ''){
                    context.root.$message.error('邮箱不能为空');
                    return false;
                }
                if(validateEmail(ruleForm.username)){
                    // root.$message.error('邮箱格式错误');
                    return false
                }
                let requestData = {
                    username:ruleForm.username,
                    module:mode.value
                }
                //修改按钮状态
                //     status:true,
                //     text:'发送中'
                // })

                GetSms(requestData).then(response=>{
                    // let data = response.data;
                    // root.$message({
                    //     message:data.message,
                    //     type:'success',
                    //     dangerouslyUseHTMLString:true
                    // });

                })
            })

            const submitForm = ((formName) => {
                // axios.get('http://test123.com/test')
                //     .then(function (response) {
                //         console.log(response);
                //     })
                //     .catch(function (error) {
                //         console.log(error);
                //     });
                context.refs[formName].validate((valid) => {
                    if (valid) {

                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            })


            /**
             * 生命周期
             */
            //挂在完成后
            onMounted(() => {
                // GetSms()
            })

            return {
                menuTab,
                mode,
                loginButtonStatus,
                checkup,
                getSms,
                submitForm,
                ruleForm,
                rules,

            }
        },


    };
</script>

<style lang="scss" scoped>
    @import "login.scss";
</style>
