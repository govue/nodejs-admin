<template>
    <div class="index">
        <HeadNav></HeadNav>
        <LeftMenu></LeftMenu>
        <div class="rightContainer">
            <router-view></router-view>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import HeadNav from '../components/HeadNav'
    import LeftMenu from '../components/LeftMenu'

    export default {
      name: "Index",
      components: {
        HeadNav,
        LeftMenu
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .index
        width 100%
        height 100%
        overflow hidden
    .rightContainer
        position: relative
        top: 0
        left: 180px
        width: calc(100% - 180px)
        height: calc(100% - 71px)
        overflow: auto
</style>
