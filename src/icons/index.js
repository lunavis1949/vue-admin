import Vue from "vue";
import SvgIcon from "@/icons/SvgIcon";
Vue.component("svg-icon",SvgIcon)

/**
 * 1 指定目录
 * 2 是否遍历子目录
 * 3 定义遍历文件规则
 */
const rep = require.context('./svg',false,/\.svg$/)  //获取当前svg目录所有为.svg结尾的文件
const requireAll = requireContext=>{
    return requireContext.keys().map(requireContext)  // 解析获取的.svg文件的文件名称，并返回
}
requireAll(rep)