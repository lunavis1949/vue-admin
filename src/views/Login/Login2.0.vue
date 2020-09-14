<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li  v-for="(item,index) in menuTab" :key="index" :class="{'current': item.current}" @click="checkup(item)" >{{item.txt}}</li>
            </ul>
<!--            表单start      -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="login-form" size="medium">
                <el-form-item  prop="username">
                    <label>邮箱</label>
                    <el-input type="text" class="item-form" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="checkPass">
                    <label>密码</label>
                    <el-input type="password" class="item-form" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="passwords" v-show="mode=='register'">
                    <label>重复密码</label>
                    <el-input type="password" class="item-form" v-model="ruleForm.passwords" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="code">
                    <label>验证码</label>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-input class="item-form" v-model.number="ruleForm.code"></el-input>
                        </el-col>
                        <el-col :span="12" class="block">
                            <el-button type="success" >验证码</el-button>
                        </el-col>
                    </el-row>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login-btn block" @click="submitForm('ruleForm')">{{msg}}</el-button>

                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { stripscript ,validateEmail,validateCode,validatePwd } from '@/utils/validate.js';
    export default {
        name: "login",
        data() {

            var validateUser = (rule, value, callback) => {

                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if(validateEmail(value)){
                    callback(new Error('用户格式有误'));
                }else{
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                value = stripscript(value)
                this.ruleForm.checkPass =value

                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (validatePwd(value)) {
                    callback(new Error('只能输入6-20个字母、数字、下划线'));
                } else {
                    callback();
                }
            };
            var checkCode = (rule, value, callback) => {
                value = stripscript(value)
                this.ruleForm.code =value

                if (!value) {
                    return callback(new Error('请输入验证码'));
                }else if(validateCode(value)){
                    return callback(new Error('验证码有误'));
                }else{
                    callback();
                }

            };
            var passwords = (rule, value, callback) => {
                if(this.mode=='login'){callback();}
                if(value!==this.ruleForm.checkPass){
                    return callback(new Error('两次密码不一致'));
                }else{
                    callback();
                }
            };
            return {
                menuTab:[
                    {txt:'登录',current:true,type:'login'},
                    {txt:'注册',current:false,type:'register'}
                ],
                ruleForm: {
                    username: '',
                    checkPass: '',
                    passwords:'',
                    code: ''
                },
                rules: {
                    username: [
                        { validator: validateUser, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    code: [
                        { validator: checkCode, trigger: 'blur' }
                    ],
                    passwords:[
                        { validator: passwords, trigger: 'blur' }
                    ]
                },
                show:false,
                mode:'login',
                msg:'登录',
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            checkup(data){
                this.menuTab.forEach((ele,index)=>{
                    ele.current=false;
                });
                data.current=true;
                if(data.type=='register'){
                    this.mode = 'register';
                    this.msg='注册'
                }else{
                    this.mode ='login';
                    this.msg='登录'
                }

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }

        }
    };
</script>

<style lang="scss" scoped>
    #login {
        height: 100vh;
        background-color: #8cc8ff;
    }
    .login-wrap{
        width: 330px;
        margin: auto;
    }
    .menu-tab{
        text-align: center;
        li{
            display: inline-block;
            width: 88px;
            height: 36px;
            font-size: 14px;
            color: #fff;
            border-radius: 2px;
            cursor: pointer;
        }
    }
    .current{
        background-color: rgba(0,0,0,.1);
    }
    .login-form{
        margin-top: 29px;
        label{
            display: block;
            size: 14px;
            color: #fff;
            margin-top: 3px;
        }
        .item-form{
            margin-bottom: 13px;
        }
        .block{
            width: 100%;
            display: block;
        }
        .login-btn{
            margin-top: 19px;
        }
    }

</style>
