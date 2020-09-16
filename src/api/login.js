import service from "@u/request";

/**
 * 获取验证码
 */
export function GetSms() {
    // service.get('/getSms')
    //     .then(function(response) {
    //         console.log(response.data);
    //     });
    return service.request({
        method: 'get',
        url: '/getSms',
        data: {}
    })
}


/**
 * 获取用户角色
 */

/**
 * 登录
 */

/**
 * 注册
 */
