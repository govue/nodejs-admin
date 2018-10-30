<template>
  <div id="app">
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <router-view/>
  </div>
</template>
<script>
import jwt_decode from 'jwt-decode'

export default {
  name: 'App',
  created() {
    if (localStorage.eleToken) {
      const decoded = jwt_decode(localStorage.eleToken)
      // 存储到vuex
      this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded))
      this.$store.dispatch('setUser', decoded)
    }
  },
  methods: {
    /**
     * 判断是否为空
     * @param value
     * @returns {boolean} 为空返回true, 不为空返回false
     */
    isEmpty(value) {
      return (
        value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'String' && value.trim().length === 0)
      )
    }
  }
}
</script>
<style lang="stylus">
html,
body,
#app
  width 100%
  height 100%

</style>
