
// const url = 'http://192.168.3.58:8888/'
// const url='http://www.lunavis.top/'
const url = 'http://test123.com/api/'
const apiUrl = ({
    img_url: 'https://cdn.moshou.site/',//七牛云图片域名
    getWithdrawList:url + 'admin/Statis/getWithdrawList',//提现列表
    enableWithdraw:url + 'admin/Statis/enableWithdraw',//提现通过
    login: url + 'admin/index/login',//登陆
    logout: url + 'admin/index/logout',//退出登录
    delAuthUri: url + 'admin/user/delAuthUri',//删除权限模块路径
    getLoginIpHistory: url + 'admin/index/getLoginIpHistory',//获取最近登录的IP
    getpagelist: url + 'admin/user/getpagelist',//获取导航（页面）列表
    updatemodule: url + 'admin/user/updatemodule',//更新模块（修改导航状态）
    destroymodule: url + 'admin/user/destroymodule',//删除模块
    register: url + 'admin/user/createmodule',//创建导航
    readrolelist: url + 'admin/user/readrolelist',//获取管理元列表
    destroyrole: url + 'admin/user/destroyrole',//删除管理员
    updaterole: url + 'admin/user/updaterole',//修改管理员
    createrole: url + 'admin/user/createrole',//添加管理员
    getsubmodulelist: url + 'admin/user/getsubmodulelist',//获取子模块
    getUserAuthAndRoleAuth: url + 'admin/user/getUserAuthAndRoleAuth',//权限映射
    saveRoleAuth: url + 'admin/user/saveRoleAuth',//保存权限
    getUserList: url + 'admin/user/getUserList',//获取用户列表
    deleteUser: url + 'admin/user/deleteUser',//删除用户
    enableUser: url + 'admin/user/enableUser',//开启用户
    disableUser: url + 'admin/user/disableUser',//禁用账号
    updateUser: url + 'admin/user/updateUser',//更新用户
    getUserDetail: url + 'admin/user/getUserDetail',//获取用户
    createUser: url + 'admin/user/createUser',//新增用户
    getChildModule: url + 'admin/user/getChildModule',//获取可行权限
    member_Index: url + 'admin/member/index',//会员管理
    editMember: url + 'admin/member/editMember',//修改会员信息
    delMember: url + 'admin/member/delMember',//删除会员
    upload_qiniu: url + 'admin/common/upload_qiniu',//上传图片
    openToken: url + 'api/member/openToken',//上传图片
    accessCount: url + 'admin/member/accessCount',//会员管理统计详情
    getJobList: url + 'admin/job/getJobList',//获取职位列表（招聘管理）
    delJob: url + 'admin/job/delJob',//删除职位（招聘管理）
    editJob: url + 'admin/job/editJob',//修改职位
    getJobDetail: url + 'admin/job/getJobDetail',//职位详情
    getVitaList: url + 'admin/vita/getVitaList',//获取简历列表
    delVita: url + 'admin/vita/delVita',//删除简历
    editVita: url + 'admin/vita/editVita',//修改简历
    getVitaDetail: url + 'admin/vita/getVitaDetail',//获取简历详情
    getStoreList: url + 'admin/store/getStoreList',//获取店面列表
    editStore: url + 'admin/store/editStore',//修改店面
    delStore: url + 'admin/store/delStore',//删除店面
    getStoreDetail: url + 'admin/store/getStoreDetail',//店面详情
    getSupplierList: url + 'admin/supplier/getSupplierList',//获取供应商列表
    editSupplier: url + 'admin/supplier/editSupplier',//修改供应商
    delSupplier: url + 'admin/supplier/delSupplier',//删除供应商
    getSupplierDetail: url + 'admin/supplier/getSupplierDetail',//供应商详情
    statis_Index: url + 'admin/statis/index',//统计列表
    visitList_Index: url + 'admin/statis/visitList',//媒体统计列表
    visitSave: url + 'admin/statis/visitSave',//修改媒体统计列表
    statisDetail: url + 'admin/statis/statisDetail',//统计详情
    getAuthUri: url + 'admin/user/getAuthUri',//获取权限
    addAuthUri: url + 'admin/user/addAuthUri',//新增权限
    editAuthUri: url + 'admin/user/editAuthUri',//修改权限
    getVersion: url + 'admin/version/getVersion',//获取app版本列表
    editVersion: url + 'admin/version/editVersion',//编辑app版本列表
    delVersion: url + 'admin/version/delVersion',//删除APP版本
    addVersion: url + 'admin/version/addVersion',//添加app版本列表
    getWxconfig: url + 'admin/version/getWxconfig',//获取小程序置顶状态
    setWxconfig: url + 'admin/version/setWxconfig',//设置小程序是否展示置顶
    getSms : url + 'getSms'  //获取验证码
})

export default apiUrl;