<template>
    <div class="index">
        <HeadNav></HeadNav>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import HeadNav from '../components/HeadNav'

    export default {
      name: "Index",
      components: {
        HeadNav
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .index
        width 100%
        height 100%
        overflow hidden
</style>
