<template>
    <div>
        <LayoutHeader></LayoutHeader>
        <LayoutMain></LayoutMain>
        <LayoutNav></LayoutNav>
    </div>
</template>

<script>
    import LayoutHeader from './Components/header'
    import LayoutMain from './Components/main'
    import LayoutNav from './Components/nav'
    export default {
        name: "index",
        components:{LayoutHeader,LayoutMain,LayoutNav},
        setup(){

        }
    }
</script>

<style scoped>

</style>