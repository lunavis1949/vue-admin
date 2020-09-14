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
                        <el-col :span="12" class="block">
                            <el-button type="success">验证码</el-button>
                        </el-col>
                    </el-row>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login-btn block" @click="submitForm('ruleForm')">{{msg}}
                    </el-button>

                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {reactive, ref, isRef, toRefs, onMounted} from '@vue/composition-api';
    import {stripscript, validateEmail, validateCode, validatePwd} from '@/utils/validate.js';

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
            // console.log(isRef(menuTab) ? '是基础类型' : '是对象类型')
            // console.log(mode.value)

            const msg = ref('登录')
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
                    msg.value = '注册'
                } else {
                    mode.value = 'login';
                    msg.value = '登录'
                }

            })
            const submitForm = ((formName) => {
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

            })

            return {
                menuTab,
                mode,
                msg,
                checkup,
                submitForm,
                ruleForm,
                rules
            }
        },


    };
</script>

<style lang="scss" scoped>
    #login {
        height: 100vh;
        background-color: #8cc8ff;
    }

    .login-wrap {
        width: 330px;
        margin: auto;
    }

    .menu-tab {
        text-align: center;

        li {
            display: inline-block;
            width: 88px;
            height: 36px;
            font-size: 14px;
            color: #fff;
            border-radius: 2px;
            cursor: pointer;
        }
    }

    .current {
        background-color: rgba(0, 0, 0, .1);
    }

    .login-form {
        margin-top: 29px;

        label {
            display: block;
            size: 14px;
            color: #fff;
            margin-top: 3px;
        }

        .item-form {
            margin-bottom: 13px;
        }

        .block {
            width: 100%;
            display: block;
        }

        .login-btn {
            margin-top: 19px;
        }
    }

</style>
