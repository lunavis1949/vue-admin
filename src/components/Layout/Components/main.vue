<template>
    <div id="main-wrap">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "main1"
    }
</script>

<style lang="scss" scoped>
#main-wrap{
    /*width: 100%;*/
    /*height: 100%;*/
    position: fixed;
    left:250px;
    top:75px;
    right:0;
    bottom: 0;
    border: 30px solid #f7f7f7;
    border-bottom: none;
    /*padding: 75px 0 0 250px;*/
    -webkit-box-sizing: border-box;
}
</style>