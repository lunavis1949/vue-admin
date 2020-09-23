<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li v-for="(item,index) in menuTab" :key="index" :class="{'current': item.current}"
                    @click="checkup(item)">{{item.txt + index}}
                </li>
            </ul>
            <!--            表单start      -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="login-form"
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
                            <el-input class="item-form" v-model="ruleForm.code"></el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-button type="success" class="block" @click="getSms()"
                                       :disabled="codeButtonStatus.status">
                                {{codeButtonStatus.text}}
                            </el-button>
                        </el-col>
                    </el-row>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login-btn block" :disabled="loginButtonStatus"
                               @click="submitForm('loginForm')">{{mode=='login'? '登录':'注册' }}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

    import {GetSms,Register,Login} from '@/api/login';
    import {reactive, ref, isRef, toRefs, onMounted} from '@vue/composition-api';
    import {stripscript, validateEmail, validateCode, validatePwd} from '@/utils/validate.js';
    import sha1 from 'js-sha1';


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

            //倒计时
            const timer = ref(null)

            //禁用登录按钮  获取验证码后启用
            const loginButtonStatus = ref(true)

            // 验证码按钮状态
            const codeButtonStatus = reactive(
                {
                    status: false,
                    text: '获取验证码'
                }
            );
            // console.log(isRef(menuTab) ? '是基础类型' : '是对象类型')
            // console.log(mode.value)

            /**
             * 表单数据
             */
            const ruleForm = reactive({
                username: '410293095@qq.com',
                checkPass: 'wo123456789',
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
                //高亮
                data.current = true;
                //修改模块值
                mode.value = data.type;
                //重置表单
                resetFromData()
                //清除定时器
                clearCountDown()
            })

            // 清除表单数据
            const resetFromData = (() => {
                // 重置表单
                // this.$refs[formName].resetFields(); //2.0
                context.refs['loginForm'].resetFields();  // 3.0
            })

            const updateButtonStatus = ((params)=>{
                codeButtonStatus.status = params.status;
                codeButtonStatus.text = params.text;
            })
            /**
             * 获取验证码
             */
            const getSms = (() => {
                // 进行提示
                if (ruleForm.username == '') {
                    // 获取到外部root
                    context.root.$message.error('邮箱不能为空');
                    return false;
                }
                if (validateEmail(ruleForm.username)) {
                    context.root.$message.error('邮箱格式错误');
                    return false
                }
                let requestData = {
                    username: ruleForm.username,
                    module: mode.value
                }
                // 修改获取验证按钮状态
                updateButtonStatus({
                    status: true,
                    text: '发送中'
                })

                setTimeout(() => {
                    GetSms(requestData).then(response => {
                        let data = response.data;
                        context.root.$message({
                            message: data.message,
                            type: 'success',
                            dangerouslyUseHTMLString: true
                        });
                        //启用登录或注册按钮
                        loginButtonStatus.value = false;
                        //调用倒时器
                        countDown(60)
                    }).catch(error => {
                        loginButtonStatus.value = false;
                        console.log(error)
                    })
                }, 2000)

            })

            const submitForm = ((formName) => {
                // checkup(menuTab[0]);
                // return false;
                context.refs[formName].validate((valid) => {
                    if (valid) {
                        if(mode.value === 'login'){
                            login();
                        }else{
                            register();
                            checkup(menuTab[0]);
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            })
            //登录
            const login = (()=>{
                let RequestData = {
                    username:ruleForm.username,
                    password:sha1(ruleForm.checkPass),
                    code:ruleForm.code,
                    module:'login'
                }
                Login(RequestData).then((response)=>{
                    let data = response.data
                    context.root.$message({
                        message: data.message,
                        type: 'success',
                    })
                    //页面跳转
                    context.root.$router.push({
                        name:'console'
                    })
                }).catch((error)=>{
                    console.log(error)
                })
            })
            //注册
            const register = (()=>{
                let RequestData = {
                    username:ruleForm.username,
                    password:sha1(ruleForm.checkPass),
                    code:ruleForm.code,
                    module:'register'
                }
                Register(RequestData).then((response)=>{
                    let data = response.data
                    context.root.$message({
                        message: data.message,
                        type: 'success',
                    })
                }).catch((error)=>{
                    console.log(error)
                })
            })
            //倒计时
            const countDown = ((number) => {
                //判断是否存在定时器  先清除
                if(timer.value){ clearInterval(timer.value);}
                let time = number;
                timer.value = setInterval(() => {
                    time--;
                    if(time === 0){
                        clearInterval(timer.value); //倒计时结束清楚定时器
                        codeButtonStatus.status=false;
                        codeButtonStatus.text='再次获取'
                    }else{
                        codeButtonStatus.text = `倒计时${time}秒`  //'倒计时'+time+'秒'
                    }

                }, 1000)
            })

            //清除倒计时
            const clearCountDown = (()=>{
                updateButtonStatus({
                    status:false,
                    text:'获取验证码'
                })
                clearInterval(timer.value);
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
                codeButtonStatus,
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
